const { User, Cart } = require("../db.js");
const postProfessionalService = require("../services/postProfessionalService.js");
const postClient = require("./postClient.js");

// const { postAProfesional } = require("./professional");

async function PostUser(userdata) {
  try {
    const { email, authid, isProfessional, isClient, ...data } = userdata;
    const newUsuario = await User.create({ email, uid: authid });
    if (isProfessional) {
      const newProfessional = await postProfessionalService({ ...data, email });
      await newUsuario.setProfessional(newProfessional);
    }
    if (isClient) {
      const newClient = await postClient({ ...data, email });
      await Cart.create({
        clientId: newClient.id,
        amount: 0.0,
      });
      await newUsuario.setClient(newClient);
    }
    return newUsuario;
  } catch (error) {
    console.log(error);
  }
}

module.exports = PostUser;
