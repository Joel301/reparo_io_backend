var faker = require("faker");
const {
  getAllProfesional,
  postAProfesional,
} = require("../../controllers/professionalController");
const getAllProfessionalService = require("../../services/getAllProfessionalService");
const postProfessionalService = require("../../services/postProfessionalService");

function getADummy() {
  const data = {};
  var randomName = faker.name.findName(); // Generates a random name
  var [firstName, lastName] = randomName.split(" ");
  return {
    firstName,
    lastName,
    phoneNumber: faker.phone.phoneNumber(),
    address: faker.address.streetName(),
    aboutMe: faker.lorem.sentence(),
    email: faker.internet.email(),
    password: faker.lorem.word(),
    professions: [
      Math.floor(Math.random() * (20 - 0) + 1),
      Math.floor(Math.random() * (20 - 0) + 1),
      Math.floor(Math.random() * (20 - 0) + 1),
      Math.floor(Math.random() * (20 - 0) + 1),
    ],
  };
}

function loadDummys(minUser = 15) {
  getAllProfessionalService()
    .then((r) => {
      var dummys = [];
      for (var i = 0; i < minUser - r.length; i++) {
        dummys.push(postProfessionalService(getADummy()));
      }
      return dummys;
    })
    .then(() => {
      console.log("dummiesLoaded");
    })
    .catch((e) => console.log(e));
}
module.exports = loadDummys;
