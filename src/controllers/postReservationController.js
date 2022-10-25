const { Reservation } = require("../db");

const postReservationController = async function (data) {
  await Reservation.create(data);
};

module.exports = postReservationController;
