var faker = require('faker');
const DefaultProfilePics = require('./DefaultProfilePics');



function getAProfessionalDummy() {
    const data = {}
    var randomName = faker.name.findName(); // Generates a random name
    var [firstName, lastName] = randomName.split(" ")
    var randomProfessional = {
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
            `${Math.floor(Math.random() * (12 - 0) + 1)}`,  // Seleccciona selecciona una profesion al azar
        ]
    }
    for (let i = 0; i < 3; i++) {
        let randNum = `${Math.floor(Math.random() * (12 - 0) + 1)}`
        randomProfessional['professions'] = [
            ...randomProfessional['professions'].filter((e) => e != randNum),
            randNum
        ]
    }
    return randomProfessional
}

module.exports = getAProfessionalDummy