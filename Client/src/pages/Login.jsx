import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useLoginMutation } from "../store/api-slice";

const Login = () => {
  const toast = useToast();

  const formBackground = useColorModeValue("gray.100", "gray.700");

  const [loginMutation] = useLoginMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e, field) => {
    setFormData((prevState) => ({ ...prevState, [field]: e.target.value }));
  };

  const handelFormSubmit = async (formData) => {
    const result = await loginMutation(formData);
    if (result.error) {
      return toast({
        position: "top",
        title: "Login failed",
        description: "Invalid email or password.",
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
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
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
          onClick={() => handelFormSubmit(formData)}
        >
          Log In
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
