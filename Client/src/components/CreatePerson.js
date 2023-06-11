import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Button,
  Box,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";

function CreatePerson({ createApplicant }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [formData, setFormData] = useState({
    appointment: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    passportNumber: "",
    dateOfBirth: "",
    issueDate: "",
  });
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      const res = await fetch(`/api/v1/appointments`);
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    createApplicant(formData);
    setFormData(() => ({
      appointment: "",
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      passportNumber: "",
      dateOfBirth: "",
      issueDate: "",
    }));
  }

  return (
    <Box
      padding={5}
      marginTop={5}
      border="1px"
      borderColor="gray.200"
      borderRadius="md">
      <Button onClick={onOpen}>Add Applicant</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Add applicant to appointment</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Stack spacing={2}>
                <FormControl isRequired>
                  <FormLabel>Appointment</FormLabel>
                  <Select
                    name="appointment"
                    placeholder="Select Appointment"
                    onChange={handleChange}
                    required>
                    {appointments.map((appointment) => (
                      <option key={appointment._id} value={appointment._id}>
                        {appointment.date.split("T")[0]}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Passport Number</FormLabel>
                  <Input
                    type="text"
                    name="passportNumber"
                    placeholder="Passport Number"
                    value={formData.passportNumber}
                    onChange={handleChange}
                    onInput={(e) => {
                      e.target.value = e.target.value.slice(0, 9);
                    }}
                    required
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Issue Date</FormLabel>
                  <Input
                    type="date"
                    name="issueDate"
                    placeholder="Date of Birth"
                    value={formData.issueDate}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" onClick={onClose} colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CreatePerson;
