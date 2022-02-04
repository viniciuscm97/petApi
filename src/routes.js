const axios = require("axios");
const Appointment = require("../class/appointment");
const { Router } = require('express');
// this should get from a .env
const baseUrl = 'https://api-homolog.geracaopet.com.br/api/challenges/challenge1';

const appointment = new Appointment(axios, baseUrl);

const routes = Router();

// consultar horários livres de todos profissionais

routes.get('/horarios-livres', appointment.getAvailableAppointments.bind(appointment));

module.exports = routes;