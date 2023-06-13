const Applicant = require("../model/applicant");
const Appointment = require("../model/appointment");
const mongoose = require("mongoose");

async function getAppointments(req, res, next) {
  try {
    const appointments = await Appointment.find()
      .select("-__v -updatedAt")
      .lean();
    const data = await Promise.all(
      appointments.map(async (appointment) => {
        const applicants = await Applicant.find({
          appointment: appointment._id,
        })
          .select("-__v -updatedAt -createdAt")
          .lean();
        return {
          ...appointment,
          applicants,
          numberOfApplicants: applicants.length,
        };
      })
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getAppointmentById(req, res, next) {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    res.json(appointment);
  } catch (err) {
    next(err);
  }
}

async function createAppointment(req, res, next) {
  try {
    const { expectedTravelDate, email, phone, note, applicants } = req.body;

    if (!expectedTravelDate || !applicants || applicants.length > 5) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const appointment = await Appointment.create({
      expectedTravelDate,
      email,
      phone,
      note,
    });

    const applicantDocs = await Applicant.insertMany(
      applicants.map((applicant) => ({
        ...applicant,
        appointment: appointment._id,
      }))
    );

    res.status(201).json({ appointment, applicants: applicantDocs });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
}

async function deleteAppointmentById(req, res, next) {
  try {
    const { id } = req.params;

    await Appointment.deleteOne({ _id: id });
    await Applicant.deleteMany({ appointment: id });

    res.status(201).json({ message: "appointment deleted successfully." });
  } catch (err) {
    next(err);
  }
}

async function addApplicant(req, res, next) {
  try {
    const applicant = req.body;

    const count = await Applicant.countDocuments({
      appointment: applicant.appointment,
    });

    if (count >= 5) {
      return res.json({ message: "Cannot add more than 5 applicants" });
    }

    const applicantDoc = await Applicant.create({ ...applicant });
    res.status(201).json({ applicantDoc });
  } catch (err) {
    next(err);
  }
}

async function deleteApplicantById(req, res, next) {
  try {
    const { id } = req.params;
    const applicant = await Applicant.findByIdAndDelete(id);

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.status(201).json(applicant);
  } catch (err) {
    next(err);
  }
}

async function updateApplicantById(req, res, next) {
  try {
    const { id } = req.params;
    const { firstName, lastName, passportNumber, dateOfBirth } = req.body;

    const updateQuery = {};

    if (firstName !== undefined) {
      updateQuery.firstName = firstName;
    }

    if (lastName !== undefined) {
      updateQuery.lastName = lastName;
    }

    if (passportNumber !== undefined) {
      updateQuery.passportNumber = passportNumberStr;
    }

    if (dateOfBirth !== undefined) {
      updateQuery.dateOfBirth = dob;
    }

    const updatedApplicant = await Applicant.findByIdAndUpdate(
      id,
      updateQuery,
      { new: true }
    );

    if (!updatedApplicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.json(updatedApplicant);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  deleteAppointmentById,
  addApplicant,
  deleteApplicantById,
  updateApplicantById,
};
