var faker = require('faker');
const DefaultProfilePics = require('./DefaultProfilePics');



function getAProfessionalDummy() {
    const data = {}
    var randomName = faker.name.findName(); // Generates a random name
    var [firstName, lastName] = randomName.split(" ")


    return {
        firstName,
        lastName,
        phoneNumber: faker.phone.phoneNumber(),
        address: faker.address.streetName(),
        aboutMe: faker.lorem.sentence(),
        email: faker.internet.email(),
        password: faker.lorem.word(),
        profileImg: DefaultProfilePics[             // Seleccciona una imagen al azar de la lista
            Math.floor(Math.random() * (
                DefaultProfilePics.length
                - 0) + 1)
        ],
        professions: [
            Math.floor(Math.random() * (20 - 0) + 1),  // Seleccciona selecciona una profesion al azar
            Math.floor(Math.random() * (20 - 0) + 1),
            Math.floor(Math.random() * (20 - 0) + 1),
            Math.floor(Math.random() * (20 - 0) + 1)
        ]
    }
}

module.exports = getAProfessionalDummy