import { useState } from "react";
import {
  Box,
  Stack,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputLeftAddon,
  Heading,
} from "@chakra-ui/react";

const MainFrom = () => {
  const [input, setInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [applicants, setApplicants] = useState([
    {
      firstName: "",
      lastName: "",
      passportNumber: "",
      dateOfBirth: "",
      image: "",
    },
  ]);

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = isSubmitted && (input === "" || phoneNumber === "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // console.log("Expected travel date:", e.target.elements.date.value);
    // console.log("Email:", input);
    // console.log("Phone number:", phoneNumber);
    // applicants.forEach((applicant, index) => {
    //   console.log(`Applicant ${index + 1} first name:`, applicant.firstName);
    //   console.log(`Applicant ${index + 1} last name:`, applicant.lastName);
    //   console.log(
    //     `Applicant ${index + 1} passport number:`,
    //     applicant.passportNumber
    //   );
    //   console.log(
    //     `Applicant ${index + 1} date of birth:`,
    //     applicant.dateOfBirth
    //   );
    //   console.log(`Applicant ${index + 1} image:`, applicant.image);
    // });
  };

  const handlePhoneKeyDown = (e) => {
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "a" ||
      e.key === "A"
    ) {
      return;
    }
    if (!/^\d+$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePhoneChange = (e) => {
    const newPhoneNumber = e.target.value.replace(/\D/g, "");
    setPhoneNumber(newPhoneNumber);
  };

  const handleAddApplicant = () => {
    setApplicants([
      ...applicants,
      {
        firstName: "",
        lastName: "",
        passportNumber: "",
        dateOfBirth: "",
        image: "",
      },
    ]);
  };

  const handleApplicantChange = (index, field, value) => {
    const newApplicants = [...applicants];
    newApplicants[index][field] = value;
    setApplicants(newApplicants);
  };

  return (
    <Stack spacing={5}>
      <Heading>Appointment</Heading>
      <form onSubmit={handleSubmit}>
        <Card variant="outline">
          <CardBody>
            <Box mb={4}>
              <FormLabel>Expected travel date</FormLabel>
              <Input
                name="date"
                placeholder="Select Date and Time"
                size="md"
                type="date"
              />
            </Box>
            <Box mb={4}>
              <FormControl isInvalid={isError}>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  value={input}
                  onChange={handleInputChange}
                />
                {isError && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid={isError}>
                <FormLabel>Phone number</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+20" />
                  <Input
                    type="tel"
                    placeholder="phone number"
                    pattern="[0-9]*"
                    maxLength="11"
                    value={phoneNumber}
                    onKeyDown={handlePhoneKeyDown}
                    onChange={handlePhoneChange}
                  />
                </InputGroup>
                {isError && (
                  <FormErrorMessage>phone number is required.</FormErrorMessage>
                )}
              </FormControl>
            </Box>
          </CardBody>
        </Card>
        <Heading mt={4}>Applicants</Heading>
        {applicants.map((applicant, index) => (
          <Card key={index} variant="outline" mt={4} mb={4}>
            <CardBody>
              <Box mb={4}>
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder="First name"
                  size="md"
                  type="text"
                  value={applicant.firstName}
                  onChange={(e) =>
                    handleApplicantChange(index, "firstName", e.target.value)
                  }
                />
              </Box>
              <Box mb={4}>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  size="md"
                  type="text"
                  value={applicant.lastName}
                  onChange={(e) =>
                    handleApplicantChange(index, "lastName", e.target.value)
                  }
                />
              </Box>
              <Box mb={4}>
                <FormLabel>Passport number</FormLabel>
                <Input
                  placeholder="Passport number"
                  size="md"
                  type="tel"
                  value={applicant.passportNumber}
                  onKeyDown={handlePhoneKeyDown}
                  onChange={(e) =>
                    handleApplicantChange(
                      index,
                      "passportNumber",
                      e.target.value
                    )
                  }
                />
              </Box>
              <Box mb={4}>
                <FormLabel>Date of birth</FormLabel>
                <Input
                  placeholder="Passport number"
                  size="md"
                  type="date"
                  value={applicant.dateOfBirth}
                  onChange={(e) =>
                    handleApplicantChange(index, "dateOfBirth", e.target.value)
                  }
                />
              </Box>
              <Box mb={4}>
                <FormLabel>Image</FormLabel>
                <Input
                  placeholder="Image"
                  size="md"
                  type="file"
                  p={1}
                  cursor={"pointer"}
                  value={applicant.image}
                  onChange={(e) =>
                    handleApplicantChange(index, "image", e.target.value)
                  }
                />
              </Box>
            </CardBody>
          </Card>
        ))}
        <Box mb={4} mt={4}>
          <Button type="button" onClick={handleAddApplicant}>
            Add applicant
          </Button>
        </Box>
        <Box mb={4} mt={4}>
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </Stack>
  );
};

export default MainFrom;
