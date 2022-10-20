const { Router } = require("express");
const {
  getAllProfesional,
  postAProfesional,
  putProfesional,
  delProfesional,
  infoById,
} = require("../controllers/professional");
const router = Router();

router.get("/", (req, res, next) => {
  getAllProfesional().then((r) => res.send(
    r.map(p => { return { "review": Math.floor(Math.random() * (5 - 0) + 1), ...p } })
  )).catch(e => console.log(e));
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const profesionalId = await infoById(id);
    return res.status(200).send(profesionalId);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { body } = req;
  console.log(body, "aqui");
  try {
    await postAProfesional(body);
    res.send({ message: "agregado" });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  putProfesional(body, id).then((r) => console.log(r));
  res.send(body);
});
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  delProfesional(id).then((r) => console.log(r));
  res.send({ message: "Professional deleted" });
});

module.exports = router;
