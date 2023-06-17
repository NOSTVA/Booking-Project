const Applicant = require("../model/applicant");
const Appointment = require("../model/appointment");

// appointment controllers
async function getAppointments(req, res, next) {
  try {
    const { visa, status, owner } = req.query;
    const queryObject = {};

    if (visa) {
      queryObject.visa = visa;
    }
    if (status) {
      queryObject.status = status;
    }
    if (owner) {
      queryObject.owner = owner;
    }

    const appointments = await Appointment.find({
      ...queryObject,
      isDeleted: { $ne: true },
    })
      .select("-__v -updatedAt -isDeleted")
      .lean();

    const payload = await Promise.all(
      appointments.map(async (appointment) => {
        const applicants = await Applicant.find({
          appointment: appointment._id,
          isDeleted: { $ne: true },
        })
          .select("-__v -updatedAt -createdAt -isDeleted -appointment")
          .lean();
        return {
          ...appointment,
          applicants,
          numberOfApplicants: applicants.length,
        };
      })
    );

    const ownerEmuns = await Appointment.schema.path("owner").options.enum;
    const visaEmuns = await Appointment.schema.path("visa").options.enum;
    const statusEmuns = await Appointment.schema.path("status").options.enum;

    res.json({
      payload,
      attributes: { ownerEmuns, visaEmuns, statusEmuns },
    });
  } catch (err) {
    next(err);
  }
}

async function getAppointmentById(req, res, next) {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });
    res.json(appointment);
  } catch (err) {
    next(err);
  }
}

async function createAppointment(req, res, next) {
  let appointment_id;
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

    appointment_id = appointment._id;

    const applicantDocs = await Applicant.insertMany(
      applicants.map((applicant) => ({
        ...applicant,
        appointment: appointment_id,
      }))
    );

    res.status(201).json({ appointment, applicants: applicantDocs });
  } catch (err) {
    await Appointment.findByIdAndDelete(appointment_id);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
}

async function deleteAppointmentById(req, res, next) {
  try {
    const { id } = req.params;

    await Appointment.findByIdAndUpdate(id, { isDeleted: true });
    await Applicant.updateMany({ appointment: id }, { isDeleted: true });

    res.status(201).json({ message: "appointment deleted successfully." });
  } catch (err) {
    next(err);
  }
}

async function updateAppointmentById(req, res, next) {
  try {
    const { id } = req.params;
    const { expectedTravelDate, email, phone, note, status, owner, visa } =
      req.body;

    const updateQuery = {};

    if (expectedTravelDate !== undefined) {
      updateQuery.expectedTravelDate = expectedTravelDate;
    }

    if (email !== undefined) {
      updateQuery.email = email;
    }

    if (phone !== undefined) {
      updateQuery.phone = phone;
    }

    if (note !== undefined) {
      updateQuery.note = note;
    }

    if (status !== undefined) {
      updateQuery.status = status;
    }

    if (owner !== undefined) {
      updateQuery.owner = owner;
    }

    if (visa !== undefined) {
      updateQuery.visa = visa;
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updateQuery,
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "appointment not found" });
    }

    res.json(updatedAppointment);
  } catch (err) {
    next(err);
  }
}

// applicant controllers
async function addApplicant(req, res, next) {
  try {
    const data = req.body;

    const count = await Applicant.countDocuments({
      appointment: data.appointment,
    });

    if (count >= 5) {
      return res.json({ message: "Cannot add more than 5 applicants" });
    }

    const applicant = await Applicant.create({ ...data });
    res.status(201).json(applicant);
  } catch (err) {
    next(err);
  }
}

async function deleteApplicantById(req, res, next) {
  try {
    const { id } = req.params;
    const applicant = await Applicant.findByIdAndUpdate(id, {
      isDeleted: true,
    });

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
      updateQuery.passportNumber = passportNumber;
    }

    if (dateOfBirth !== undefined) {
      updateQuery.dateOfBirth = dateOfBirth;
    }

    const updatedApplicant = await Applicant.findByIdAndUpdate(
      id,
      updateQuery,
      { new: true, runValidators: true }
    );

    if (!updatedApplicant) {
      return res.status(404).json({ message: "applicant not found" });
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
  updateAppointmentById,
  addApplicant,
  deleteApplicantById,
  updateApplicantById,
};
