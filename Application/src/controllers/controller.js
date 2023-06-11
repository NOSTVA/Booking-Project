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
          _id: appointment._id,
          date: appointment.date,
          applicants,
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

    const appointment = new Appointment({ date });
    const validationError = appointment.validateSync();
    if (validationError) {
      return res.status(400).json({
        message: "Invalid appointment data",
        error: validationError.errors,
      });
    }

    const applicantDocs = applicants.map((applicant) => {
      const applicantDoc = new Applicant({
        appointment: appointment._id,
        ...applicant,
      });
      const validationError = applicantDoc.validateSync();
      if (validationError) {
        throw new Error(validationError);
      }
      return applicantDoc;
    });

    await Promise.all([
      appointment.save(),
      Applicant.insertMany(applicantDocs),
    ]);
    res.status(201).json({ appointment, applicants: applicantDocs });
  } catch (err) {
    next(err);
  }
}

async function getApplicants(req, res, next) {
  try {
    const data = await Applicant.find()
      .populate({
        path: "appointment",
        select: "date",
      })
      .select("-__v -updatedAt")
      .exec();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getApplicant(req, res, next) {
  try {
    const { applicantId } = req.params;
    const data = await Applicant.findById(applicantId)
      .populate({
        path: "appointment",
        select: "date",
      })
      .select("-__v -updatedAt")
      .exec();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function addApplicant(req, res, next) {
  try {
    const applicant = req.body;

    const applicantDoc = new Applicant({ ...applicant });
    const validationError = applicantDoc.validateSync();

    if (validationError) {
      return res.status(400).json({
        message: "Invalid applicant data",
        error: validationError.errors,
      });
    }

    const count = await Applicant.countDocuments({
      appointment: applicant.appointment,
    });
    if (count >= 5) {
      return res.json({ message: "Cannot add more than 5 applicants" });
    }
    const createdApplicant = await applicantDoc.save();
    res.status(201).json({ createdApplicant });
  } catch (err) {
    next(err);
  }
}

async function deleteApplicant(req, res, next) {
  try {
    const { applicantId } = req.params;
    const applicant = await Applicant.findByIdAndDelete(applicantId);

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.status(201).json(applicant);
  } catch (err) {
    next(err);
  }
}

async function updateApplicant(req, res, next) {
  try {
    const {
      firstName,
      lastName,
      passportNumber,
      dateOfBirth,
      issueDate,
      email,
      mobileNumber,
      note,
      booked,
    } = req.body;
    const updateQuery = {};

    if (firstName !== undefined) {
      if (typeof firstName !== "string" || !firstName.trim()) {
        return res
          .status(400)
          .json({ message: "First name must be a non-empty string" });
      }
      if (firstName.length < 2 || firstName.length > 50) {
        return res
          .status(400)
          .json({ message: "First name must be between 2 and 50 characters" });
      }
      updateQuery.firstName = firstName;
    }

    if (lastName !== undefined) {
      if (typeof lastName !== "string" || !lastName.trim()) {
        return res
          .status(400)
          .json({ message: "Last name must be a non-empty string" });
      }
      if (lastName.length < 2 || lastName.length > 50) {
        return res
          .status(400)
          .json({ message: "Last name must be between 2 and 50 characters" });
      }
      updateQuery.lastName = lastName;
    }

    if (passportNumber !== undefined) {
      const passportNumberStr = passportNumber.toString();
      if (passportNumberStr.length !== 9 || isNaN(passportNumberStr)) {
        return res
          .status(400)
          .json({ message: "Passport number must be a 9-digit number" });
      }
      updateQuery.passportNumber = passportNumberStr;
    }

    if (mobileNumber !== undefined) {
      const mobileNumberRegex = /^\+20\s\d{11}$/;
      if (!mobileNumberRegex.test(mobileNumber)) {
        return res.status(400).json({
          message:
            "Mobile number must be in the format '+20 <11-digit number>'",
        });
      }
      updateQuery.mobileNumber = mobileNumber;
    }

    if (email !== undefined) {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email address" });
      }
      updateQuery.email = email;
    }

    if (dateOfBirth !== undefined) {
      const dob = new Date(dateOfBirth);
      if (isNaN(dob.getTime())) {
        return res.status(400).json({ message: "Invalid date of birth" });
      }
      updateQuery.dateOfBirth = dob;
    }

    if (issueDate !== undefined) {
      const id = new Date(issueDate);
      if (isNaN(id.getTime())) {
        return res.status(400).json({ message: "Invalid issue date" });
      }
      updateQuery.issueDate = id;
    }

    if (note !== undefined) {
      if (typeof note !== "string") {
        return res.status(400).json({ message: "Note must be a string" });
      }
      updateQuery.note = note;
    }

    if (booked !== undefined) {
      if (typeof booked !== "boolean") {
        return res.status(400).json({ message: "Booked must be a boolean" });
      }
      updateQuery.booked = booked;
    }

    const { applicantId } = req.params;
    const updatedApplicant = await Applicant.findByIdAndUpdate(
      applicantId,
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
  createAppointment,
  getApplicants,
  getApplicant,
  addApplicant,
  deleteApplicant,
  updateApplicant,
};
