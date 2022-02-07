const times = require('../helpers/times');

class Appointment {
    constructor(axios, baseUrl) {
        this.axiosConfig = {
            baseUrl
        };
        this.axios = axios;
    }

    async getAvailableAppointments(req, res) {
        const appointments = await this.appointmentsAlreadyScheduled();
        const availableAppointments = {
            availableTimes : appointments
        };
        res.send(availableAppointments);
    }

    async employessWorkInterval() {
        const path = 'https://api-homolog.geracaopet.com.br/api/challenges/challenge1/employees';
        
        const response = this.axios.get(path)
            .then(({ data }) => data)
            .catch((error) => {
                throw new Error(error);
            });
        
        return response;
    }

    async appointmentsByEmployer(employerId) {
        const path = `https://api-homolog.geracaopet.com.br/api/challenges/challenge1/employee/${employerId}/appointments`;
        
        const response = this.axios.get(path)
            .then(({ data }) => data)
            .catch((error) => {
                throw new Error(error);
            });
        
        return response;
    }

    async appointmentsAlreadyScheduled() {
        const { employees } = await this.employessWorkInterval();

        const availableAppointments = [];

        for (const { id, startsAt, finishesAt } of employees) {
            const { appointments } = await this.appointmentsByEmployer(id);
            const allAppointments = appointments.map(appointment => {
                return {
                    startsAt: appointment.startsAt,
                    finishesAt: appointment.finishesAt,
                };
            });
            availableAppointments.push(await times.availableAppointmentsByEmployer(allAppointments, { startsAt, finishesAt }));
        }
        
        let allAppointments = []
            .concat(...availableAppointments)
            .sort()
            .reduce((acc, curr) => (acc[curr] = '', acc), {});

        let parteToHourAndMinute = Object.keys(allAppointments)
            .map(item => {
                return new Date(item).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            });
        
        return parteToHourAndMinute;
    }
};

module.exports = Appointment;