class Appointment {
    constructor(axios, baseUrl) {
        // TODO não consegui colocar baseURL no axios
        this.axiosConfig = {
            baseUrl
        };
        this.axios = axios;
    }

    
    async getAvailableAppointments(req, res) {
        const WorkTime = await this.employessWorkInterval();
        const appointments = await this.appointmentsByEmployer(2);
        res.json(appointments);
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
};

module.exports = Appointment;