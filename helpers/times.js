const WORK_INTERVAL = {
    START: 8,
    END: 18,
};

const intervalsToAppointment = async () => {
    const finalIntervalAvailable = createDate(WORK_INTERVAL.END);
    const intervals = [];
    intervals.push(createDate(WORK_INTERVAL.START));

    do {
        const lastInterval = intervals[intervals.length - 1];

        const moreThirtyMinutes =
            lastInterval.getMinutes() === 0 ? 
            createDate(lastInterval.getHours(), 30) :
            createDate(lastInterval.getHours() + 1);

        intervals.push(moreThirtyMinutes);
    } while (finalIntervalAvailable.getHours() !== intervals[intervals.length - 1].getHours());


    return intervals;
};

const onlyAvailableAppointments = async (appointments) => {
    const scheduleAppointments = await toDate(appointments);
    const intervals = intervalsToAppointment();

    return scheduleAppointments;
};

const createDate = (hour, minute = 0) => {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date;
};

const toDate = (appointments) => {
    return appointments.map((data) => {
        const [startHour,startMinute] = data.startsAt.split(':');
        const [endHour,endMinute] = data.finishesAt.split(':');
        return {
            start: createDate(startHour,startMinute),
            end: createDate(endHour,endMinute),
        }
    });
};

module.exports = {
    intervalsToAppointment,
    onlyAvailableAppointments,
};