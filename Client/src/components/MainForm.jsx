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
} from "@chakra-ui/react";
import { useCreateAppointmentMutation } from "../store/api-slice";
import { AiOutlineClose } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";

const MainFrom = () => {
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();
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

  const toast = useToast();

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = isSubmitted && (input === "" || phoneNumber === "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (input === "" || phoneNumber === "") {
      toast({
        title: "Please fill in all required fields",
        status: "warning",
        duration: null,
        isClosable: false,
        position: "top",
      });
      return;
    }

    const formData = {
      expectedTravelDate: e.target.elements.date.value,
      email: input,
      phone: "+20" + phoneNumber,
      applicants: applicants,
    };
    createAppointment(formData);
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

  const handleDeleteApplicant = (index) => {
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
              }}>
              Yes
            </Button>
            <Button
              size="sm"
              bg="black"
              _hover="black"
              onClick={() => toast.closeAll()}>
              No
            </Button>
          </HStack>
        </Stack>
      ),
    });
  };

  const handleConfirmDelete = (index) => {
    const newApplicants = [...applicants];
    newApplicants.splice(index, 1);
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
                    onChange={(e) => handlePhoneChange(e)}
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
              <Box position="absolute" top={1} right={2}>
                <IconButton
                  icon={<AiOutlineClose />}
                  onClick={() => handleDeleteApplicant(index)}
                />
              </Box>
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
                  type="text"
                  // p={1}
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
