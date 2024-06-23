const { Appointments } = require("../models/index.js");

async function createAppointment(data) {
  return await Appointments.create(data, { returning: true });
}

module.exports = {
  createAppointment,
};
