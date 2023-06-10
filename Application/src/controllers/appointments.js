const Applicant = require("../model/applicant");
const Appointment = require("../model/appointment");

async function getAppointments(req, res, next) {
  try {
    const appointments = await Appointment.find();

    const data = await Promise.all(
      appointments.map(async (appointment) => {
        const applicants = await Applicant.find({
          appointment: appointment._id,
        });
        return {
          date: appointment.date,
          applicants: applicants,
        };
      })
    );

    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function createAppointment(req, res, next) {
  try {
    const { date, applicants } = req.body;

    if (
      !date ||
      !Array.isArray(applicants) ||
      applicants.length === 0 ||
      applicants.length > 5
    ) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const createdAppointment = await Appointment.create({ date });
    const createdApplicants = await Applicant.insertMany(
      applicants.map((applicant) => ({
        appointment: createdAppointment._id,
        email: applicant.email,
        mobileNumber: applicant.mobileNumber,
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        visaType: applicant.visaType,
        passportNumber: applicant.passportNumber,
        dateOfBirth: applicant.dateOfBirth,
        issueDate: applicant.issueDate,
        issuePlace: applicant.issuePlace,
      }))
    );

    res.status(201).json({ createdAppointment, createdApplicants });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAppointments, createAppointment };
