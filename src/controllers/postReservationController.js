const { Reservation } = require("../db");

const postReservationController = async function (data) {
  return await Reservation.create({
    days: data.days,
    professionalId: data.professionalId,
  });
};

module.exports = postReservationController;
