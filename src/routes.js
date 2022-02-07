const axios = require("axios");
const Appointment = require("../class/appointment");
const { Router } = require('express');

const appointment = new Appointment(axios);

const routes = Router();

// consultar horários livres de todos profissionais

routes.get('/horarios-livres', appointment.getAvailableAppointments.bind(appointment));

module.exports = routes;