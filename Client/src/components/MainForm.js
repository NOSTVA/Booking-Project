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

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = isSubmitted && (input === "" || phoneNumber === "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handlePhoneKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
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

  return (
    <Stack spacing={5}>
      <Heading>Appointment</Heading>
      <form onSubmit={handleSubmit}>
        <Card variant="outline">
          <CardBody>
            <Box mb={4}>
              <FormLabel>Expected travel date</FormLabel>
              <Input placeholder="Select Date and Time" size="md" type="date" />
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

        <Box mb={4} mt={4}>
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </Stack>
  );
};

export default MainFrom;
