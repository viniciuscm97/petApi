const availableAppointmentsByEmployer = async (appointments, workingDay) => {
    const { startsAt, finishesAt } = workingDay;
    const startTime = startsAt.split(':');
    const finalTime = finishesAt.split(':');
 
    const appointmentsDate = toDate(appointments);
    const finalIntervalAvailable = createDate(...finalTime);
    const intervals = [];
    
    intervals.push(createDate(...startTime));

    do {
        const lastInterval = intervals[intervals.length - 1];

        const moreThirtyMinutes =
            lastInterval.getMinutes() === 0 ? 
            createDate(lastInterval.getHours(), 30) :
            createDate(lastInterval.getHours() + 1);
        
        intervals.push(moreThirtyMinutes);

    } while (finalIntervalAvailable.getHours() !== intervals[intervals.length - 1].getHours());

    const availableAppointments = intervals.filter((interval) => {
        const alreadySchedule = appointmentsDate.find(appointment => {
            return ((interval.getHours() >= appointment.start.getHours() && interval.getMinutes() >= appointment.start.getMinutes())
                && (interval.getHours() < appointment.end.getHours() && interval.getMinutes() < appointment.end.getMinutes()))
                || (interval > appointment.start && interval < appointment.end);
        });
        
        return !alreadySchedule;
    });

    return availableAppointments;
};

const createDate = (hour, minute = 0) => {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);
    return date;
};

const toDate = (appointments) => {
    return appointments.map(data => {
        const start = data.startsAt.split(':');
        const end = data.finishesAt.split(':');
        return {
            start: createDate(...start),
            end: createDate(...end),
        }
    });
};

module.exports = {
    availableAppointmentsByEmployer,
};