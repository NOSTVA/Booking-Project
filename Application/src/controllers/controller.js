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

    console.log(date, applicants);

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
        ...applicant,
      }))
    );

    res.status(201).json({ createdAppointment, createdApplicants });
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
    console.log(applicant);

    const count = await Applicant.find({ appointment: applicant.appointment });

    if (!count || !(count.length < 5)) {
      return res.json({ message: "cannot add more than 5 applicant" });
    }

    const createdApplicant = await Applicant.create({ ...applicant });

    res.status(201).json({ createdApplicant });
  } catch (err) {
    next(err);
  }
}

async function deleteApplicant(req, res, next) {
  try {
    const { applicantId } = req.params;

    const applicant = await Applicant.findByIdAndDelete(applicantId);

    if (!applicant)
      return res.status(404).json({ message: "applicant not found" });

    res.status(201).json(applicant);
  } catch (err) {
    next(err);
  }
}

async function updateApplicant(req, res, next) {
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
        .json({ message: "firstName must be a non-empty string" });
    }
    if (firstName.length < 2 || firstName.length > 50) {
      return res
        .status(400)
        .json({ message: "firstName must be between 2 and 50 characters" });
    }
    updateQuery.firstName = firstName;
  }

  if (lastName !== undefined) {
    if (typeof lastName !== "string" || !lastName.trim()) {
      return res
        .status(400)
        .json({ message: "lastName must be a non-empty string" });
    }
    if (lastName.length < 2 || lastName.length > 50) {
      return res
        .status(400)
        .json({ message: "lastName must be between 2 and 50 characters" });
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
        message: "Mobile number must be in the format of '+20 01111970606'",
      });
    }
    updateQuery.mobileNumber = mobileNumber;
  }

  if (booked !== undefined) {
    if (typeof booked !== "boolean") {
      return res
        .status(400)
        .json({ message: "Booked must be a boolean value" });
    }
    updateQuery.booked = booked;
  }

  if (issueDate !== undefined) {
    const issueDateObj = new Date(issueDate);
    if (isNaN(issueDateObj.getTime())) {
      return res
        .status(400)
        .json({ message: "Issue date must be a valid date" });
    }
    updateQuery.issueDate = issueDateObj;
  }

  if (dateOfBirth !== undefined) {
    const birthDate = new Date(dateOfBirth);
    if (isNaN(birthDate.getTime())) {
      return res
        .status(400)
        .json({ message: "Date of birth must be a valid date" });
    }
    const age = Math.floor(
      (new Date() - birthDate) / (365.25 * 24 * 60 * 60 * 1000)
    );
    if (age < 1 || age > 120) {
      return res.status(400).json({ message: "Age must be between 1 and 120" });
    }
    updateQuery.dateOfBirth = birthDate;
  }

  if (note !== undefined) {
    if (typeof note !== "string") {
      return res.status(400).json({ message: "Note must be a string" });
    }
    updateQuery.note = note;
  }

  if (email !== undefined) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res
        .status(400)
        .json({ message: "Email must be a valid email address" });
    }
    updateQuery.email = email;
  }

  try {
    const { applicantId } = req.params;
    const applicant = await Applicant.findByIdAndUpdate(
      applicantId,
      updateQuery
    );
    res.json(applicant);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAppointments,
  createAppointment,
  getApplicants,
  addApplicant,
  deleteApplicant,
  getApplicant,
  updateApplicant,
};
