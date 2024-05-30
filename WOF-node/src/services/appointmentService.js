const Appointment = require('../models/Appointment');


exports.checkRecentAppointment = async (registrationNumber, selectedDate) => {
    const lastAppointment = await Appointment.findOne({ registrationNumber }).sort({ date: -1 });

    if (!lastAppointment) {
        return false;
    }

    const lastAppointmentDate = new Date(lastAppointment.date);
    const threeMonthsLater = new Date(lastAppointmentDate);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    return new Date(selectedDate) < threeMonthsLater;
};

exports.checkAvailability = async (date, time, registrationNumber) => {
    return await Appointment.findOne({ date, time, registrationNumber });
};

exports.bookAppointment = async (appointmentData) => {
    const appointment = new Appointment(appointmentData);
    return await appointment.save();
};

exports.getAllBookedSlots = async () => {
    return await Appointment.find({});
};

exports.getUserAppointments = async (userId) => {
    return await Appointment.find({ userId });
};