const times = require('../helpers/times');

class Appointment {
    constructor(axios, baseUrl) {
        // TODO não consegui colocar baseURL no axios
        this.axiosConfig = {
            baseUrl
        };
        this.axios = axios;
    }

    // criei os horarios que podem ser reservados, agora pegar os horarios que temos ocupados e comparar
    async getAvailableAppointments(req, res) {
        const appointments = await this.appointmentsAlreadyScheduled();
        const interval = await times.onlyAvailableAppointments(appointments);

        res.json(interval);
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
        const allAppointments = [];

        for (const { id } of employees) {
            const { appointments } = await this.appointmentsByEmployer(id);
            appointments.forEach((appointment) => {
                allAppointments.push({
                    startsAt: appointment.startsAt,
                    finishesAt: appointment.finishesAt,
                });
            });
        }

        return allAppointments;
    }
};

module.exports = Appointment;