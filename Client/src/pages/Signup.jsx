import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  useColorModeValue,
  Text,
  Link,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useRegisterMutation } from "../store/api-slice";

const Signup = () => {
  const toast = useToast();

  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [registerMutation] = useRegisterMutation();

  const handleInputChange = (e, field) => {
    setFormData((prevState) => ({ ...prevState, [field]: e.target.value }));
  };

  const handelFormSubmit = async (formData) => {
    const result = await registerMutation(formData);
    if (result.error) {
      console.log(result.error);
      return toast({
        position: "top",
        title: "Login failed",
        description: result.error.data.errors[0].message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    window.location.href = "/";
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg">
        <Heading mb={6}>Signup</Heading>
        <FormControl>
          <Input
            placeholder="example@gmail.com"
            type="email"
            variant="filled"
            mb={3}
            required
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
        </FormControl>
        <FormControl>
          <Input
            placeholder="**********"
            type="password"
            variant="filled"
            mb={6}
            required
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          mb={8}
          onClick={() => handelFormSubmit(formData)}>
          signup
        </Button>

        <FormControl display="flex" alignItems="center">
          <HStack>
            <Text>Do you have an account ?</Text>
            <Button href="/login" as={Link} size="sm">
              Login
            </Button>
          </HStack>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Signup;
