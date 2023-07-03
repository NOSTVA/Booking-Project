function getAppointmentCode(appointment) {
  console.log(appointment);
  const { applicants, email, phone, expectedTravelDate } = appointment;
  const newApplicants = applicants.map((applicant) => ({
    ...applicant,
    dateOfBirth: applicant.dateOfBirth.split("T")[0],
    expectedTravelDate: expectedTravelDate.split("T")[0],
    email,
    phone,
  }));

  return `
    
    applicants = ${JSON.stringify(newApplicants)}
    document
      .querySelector("app-no-form #phone")
      .dispatchEvent(new Event("ngModelChange"));
    
    applicants.map(async (applicant, index) => {
      await fillInput("surname", applicant.firstName, index);
      await fillInput("name", applicant.lastName, index);
      await fillInput("birthLocalDate", applicant.dateOfBirth, index);
      await fillInput("passport", applicant.passportNumber, index);
      await fillInput("applicantEmail", applicant.email, index);
      await fillInput("phone", applicant.phone, index);
      await fillInput(
        "expectedDepartureLocalDate",
        applicant.expectedTravelDate,
        index
      );
    });
    
    async function fillInput(field, value, folderIndex) {
      let ele = document.querySelectorAll(
        'app-no-form form input[name="' + field +'"]'
      )[folderIndex];
      ele.value = value;
      ele.dispatchEvent(new Event("input"));
      ele.dispatchEvent(new Event("change"));
      ele.dispatchEvent(new Event("compositionend"));
    }
    `;
}

function getLoginCode(appointment) {
  return `
    document.getElementsByName("email")[1].value = "${appointment}";
    document.getElementsByName("password")[0].value  = "Ahmed@2842663";
    
    `;
}

export { getAppointmentCode, getLoginCode };
