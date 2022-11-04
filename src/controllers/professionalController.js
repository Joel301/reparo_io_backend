const { Professional, Profession, Reservation } = require("../db.js");
const { Op } = require("sequelize");
const postProfessionalService = require("../services/postProfessionalService.js");
const getAllProfessionalService = require("../services/getAllProfessionalService.js");

const isUUID =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const getAllProfesional = async (req, res, next) => {
  try {
    const results = await getAllProfessionalService();
    if (!results) res.json("no professionals found");
    else
      res.json(
        results.map((p) => {
          //esto es para solo retornar la profesion en array y excluir el Prof_Prof
          if (p.professions.length) {
            return {
              ...p.dataValues,
              professions: p.dataValues.professions.map((profemap) => {
                const { id, name } = profemap.dataValues;
                return { id, name };
              }),
            };
          } else {
            return p.dataValues;
          }
        })
      );
  } catch (error) {
    error.message = "error at getting all professionals";
    next(error);
  }
};

const getProfessioanlById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!isUUID.test(id)) throw new Error("Invalid UUID Format"); //revisa que sea un uuid para evitar sequelize error
    const profesionalId = await Professional.findOne({
      where: { id: id },
      include: [{ model: Profession, attributes: ["id", "name"] }],
    });

    if (!profesionalId) res.json("not Found");
    else {
      let profes = profesionalId.professions ? profesionalId.professions : [];

      //obteniendo disponibilidad
      //const allReservations = Reservation.findAll({
      //  where: { profesionalId: id },
      //});

      //const stock = profesionalId.availableDays.filter((day) => {
      //  return allReservations.forEach((element) => {
      //   if (element.days.includes(day)) return false;
      //  });
      // });

      const prof = {
        id: profesionalId.id,
        firstName: profesionalId.firstName,
        lastName: profesionalId.lastName,
        profileImg: profesionalId.profileImg,
        phoneNumber: profesionalId.phoneNumber,
        address: profesionalId.address,
        email: profesionalId.email,
        rating: profesionalId.rating,
        reputation: profesionalId.reputation
          ? profesionalId.reputation
          : "not available yet",
          availableDays: profesionalId.availableDays,
        //  stock,
        professions: profes,
      };
      res.json(prof);
    }
  } catch (e) {
    next(e);
  }
};

//Validaciones -- Se podrian mover a un archivo aparte
function isStringOk(data) {
  data.forEach((element) => {
    if (typeof element !== "string")
      throw new Error(`INPUT_ERROR: ${element} is not a String`);
    if (element.trim() === "")
      throw new Error(`INPUT_ERROR: ${element} cannot be empty`);
  });
}

function isArrayOk(data) {
  if (typeof data !== "object")
    throw new Error(`INPUT_ERROR: ${data} is not an Array`);
}

function isEmail(data) {
  if (!data) throw new Error(`INPUT_ERROR: email cannot be empty`);
  if (data.trim() === "")
    throw new Error(`INPUT_ERROR: ${element} cannot be empty`);
  if (
    !data.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  )
    throw new Error(`${data} is not an email`);
}

const postAProfesional = async (req, res, next) => {
  const { firstName, lastName, address, professions, email } = req.body;
  try {
    isStringOk([firstName, lastName, address]);
    isEmail(email);
    isArrayOk(professions);

    const newProfessional = await postProfessionalService(req.body);

    res.json({ newProfessional, message: "professional created" });
  } catch (e) {
    e.message = "error to create professional";
    next(e);
  }
};

const putProfesional = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    let updateProfesional = await Professional.findOne({
      where: {
        id: id,
      },
      include: {
        model: Profession,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    await updateProfesional.update({
      firstName: body.firstName,
      lastName: body.lastName,
      phoneNumber: body.phoneNumber,
      address: body.address,
      aboutMe: body.aboutMe,
      profileImg: body.profileImg,
    });
    let profDb = await Profession.findAll({
      where: {
        name: {
          [Op.in]: body.professions,
        },
      },
    });
    await updateProfesional.setProfessions(profDb);
    res.json({ updateProfesional, message: "profesional actualizado" });
  } catch (error) {
    next(error);
  }
};
const delProfesional = async (req, res, next) => {
  const { id } = req.params;
  try {
    const profDelete = await Professional.findByPk(id, {
      include: {
        model: Profession,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (profDelete) {
      profDelete.update({...profDelete, enabled:false});
      res.json({ profDelete, message: "..Professional deleted!" });
    } else res.send({ message: "professional not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProfesional,
  postAProfesional,
  putProfesional,
  delProfesional,
  getProfessioanlById,
};
