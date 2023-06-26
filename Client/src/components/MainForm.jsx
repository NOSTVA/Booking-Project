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
  IconButton,
  Text,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useCreateAppointmentMutation } from "../store/api-slice";
import { AiOutlineClose } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";

const MainFrom = () => {
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();
  const [errMsg, setErrMsg1] = useState("");
  const [fnameErr, setFnameErr] = useState("");
  const [expicDate, setExpicDate] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");
  const [input, setInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [applicants, setApplicants] = useState([
    {
      firstName: { value: "", err: "" },
      lastName: { value: "", err: "" },
      passportNumber: { value: "", err: "" },
      dateOfBirth: { value: "", err: "" },
      image: { value: "", err: "" },
    },
  ]);

  const toast = useToast();

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = isSubmitted && (input === "" || phoneNumber === "");

  function getApplicantsData(applicants) {
    return applicants.map((applicant) => {
      return Object.fromEntries(
        Object.entries(applicant).map(([field, { value }]) => [field, value])
      );
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Check if all required fields are filled
    const isFieldsEmpty = applicants.some(
      (applicant) =>
        !applicant.firstName.value ||
        !applicant.lastName.value ||
        !applicant.passportNumber.value ||
        !applicant.dateOfBirth.value ||
        !applicant.image.value
    );

    const isImageValid = applicants.every(
      (applicant) =>
        !applicant.image.value || applicant.image.value.startsWith("https://")
    );

    if (input === "" || phoneNumber === "" || isFieldsEmpty) {
      toast({
        title: "Please fill in all required fields",
        status: "warning",
        duration: null,
        isClosable: false,
        position: "top",
        duration: 3000,
      });
      return;
    }
    const today = new Date();
    const isDateValid = applicants.every((applicant) => {
      const applicantDate = new Date(applicant.dateOfBirth.value);
      return applicantDate.getTime() < today.getTime();
    });
    if (!isDateValid) {
      toast({
        title: "Please enter valid date of birth",
        status: "warning",
        duration: null,
        isClosable: false,
        position: "top",
        duration: 3000,
      });
      return;
    }
    if (!isImageValid) {
      toast({
        title: "The image URL must start with https:// ",
        status: "warning",
        duration: null,
        isClosable: false,
        position: "top",
        duration: 3000,
      });
      return;
    }
    const formData = {
      expectedTravelDate: e.target.elements.date.value,
      email: input,
      phone: "+20" + phoneNumber,
      applicants: getApplicantsData(applicants),
    };

    await createAppointment(formData);
    window.location.reload();
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
    if (applicants.length < 5) {
      setApplicants([
        ...applicants,
        {
          firstName: { value: "", err: "" },
          lastName: { value: "", err: "" },
          passportNumber: { value: "", err: "" },
          dateOfBirth: { value: "", err: "" },
          image: { value: "", err: "" },
        },
      ]);
    } else {
      toast({
        title: "maximum number of applicants is 5",
        status: "warning",
        duration: null,
        isClosable: false,
        position: "top",
        duration: 3000,
      });
      return;
    }
  };

  const handleApplicantChange = (index, field, value) => {
    const newApplicants = [...applicants];
    newApplicants[index][field].value = value;
    setApplicants(newApplicants);
  };

  const handleDeleteApplicant = (index) => {
    if (applicants.length > 1) {
      toast({
        title: "Applicant deleted",
        status: "warning",
        duration: null,
        isClosable: false,
        position: "top",
        render: () => (
          <Stack bg="gray.300" p={4} borderRadius="3">
            <Text color="black" mb={2}>
              Are you sure you want to delete this applicant?
            </Text>
            <HStack spacing={4} justifyContent="center">
              <Button
                colorScheme="red"
                fontWeight="bold"
                size="sm"
                onClick={() => {
                  handleConfirmDelete(index);
                  toast.closeAll();
                }}
              >
                Yes
              </Button>
              <Button size="sm" bg="black" onClick={() => toast.closeAll()}>
                No
              </Button>
            </HStack>
          </Stack>
        ),
      });
    }
  };

  const handleConfirmDelete = (index) => {
    const newApplicants = [...applicants];
    newApplicants.splice(index, 1);
    setApplicants(newApplicants);
  };
  return (
    <Stack>
      {!isLoading ? (
        <Stack spacing={5}>
          <Heading>Appointment</Heading>
          <form onSubmit={handleSubmit}>
            <Card variant="outline">
              <CardBody>
                <Box mb={4}>
                  <FormControl isInvalid={isError}>
                    <FormLabel>Expected travel date</FormLabel>
                    <Input
                      name="date"
                      placeholder="Select Date and Time"
                      size="md"
                      type="date"
                    />
                    <FormErrorMessage>{expicDate}</FormErrorMessage>
                  </FormControl>
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
                    <FormErrorMessage>{emailMsg}</FormErrorMessage>
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
                        onChange={(e) => handlePhoneChange(e)}
                      />
                    </InputGroup>
                    <FormErrorMessage>{phoneMsg}</FormErrorMessage>
                  </FormControl>
                </Box>
              </CardBody>
            </Card>
            <Heading mt={4}>Applicants</Heading>
            {applicants.map((applicant, index) => (
              <Card key={index} variant="outline" mt={4} mb={4}>
                <CardBody>
                  <Box position="absolute" top={1} right={2}>
                    {applicants.length > 1 ? (
                      <IconButton
                        icon={<AiOutlineClose />}
                        onClick={() => handleDeleteApplicant(index)}
                      />
                    ) : (
                      ""
                    )}
                  </Box>
                  <Box mb={4}>
                    <FormControl isInvalid={isError}>
                      <FormLabel>First name</FormLabel>
                      <Input
                        placeholder="First name"
                        size="md"
                        type="text"
                        value={applicant.firstName.value}
                        onChange={(e) =>
                          handleApplicantChange(
                            index,
                            "firstName",
                            e.target.value
                          )
                        }
                      />
                      <FormErrorMessage>{fnameErr}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box mb={4}>
                    <FormLabel>Last name</FormLabel>
                    <Input
                      placeholder="Last name"
                      size="md"
                      type="text"
                      value={applicant.lastName.value}
                      onChange={(e) =>
                        handleApplicantChange(index, "lastName", e.target.value)
                      }
                    />
                    <FormErrorMessage>{errMsg}</FormErrorMessage>
                  </Box>
                  <Box mb={4}>
                    <FormLabel>Passport number</FormLabel>
                    <Input
                      placeholder="Passport number"
                      size="md"
                      type="tel"
                      value={applicant.passportNumber.value}
                      onChange={(e) =>
                        handleApplicantChange(
                          index,
                          "passportNumber",
                          e.target.value
                        )
                      }
                    />
                    <FormErrorMessage>{errMsg}</FormErrorMessage>
                  </Box>
                  <Box mb={4}>
                    <FormLabel>Date of birth</FormLabel>
                    <Input
                      placeholder="Date of birth"
                      size="md"
                      type="date"
                      value={applicant.dateOfBirth.value}
                      onChange={(e) =>
                        handleApplicantChange(
                          index,
                          "dateOfBirth",
                          e.target.value
                        )
                      }
                    />
                    <FormErrorMessage>{errMsg}</FormErrorMessage>
                  </Box>
                  <Box mb={4}>
                    <FormLabel>Image</FormLabel>
                    <Input
                      placeholder="Image"
                      size="md"
                      type="text"
                      value={applicant.image.value || ""}
                      onChange={(e) =>
                        handleApplicantChange(index, "image", e.target.value)
                      }
                    />
                    <FormErrorMessage>
                      The image should be start with "https://"
                    </FormErrorMessage>
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
      ) : (
        <Stack alignItems="center">
          <Spinner
            margin={10}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Stack>
      )}
    </Stack>
  );
};

export default MainFrom;
