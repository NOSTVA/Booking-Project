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
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useRegisterMutation } from "../store/api-slice";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Signup = () => {
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [registerMutation] = useRegisterMutation();

  const handleInputChange = (e, field) => {
    setFormData((prevState) => ({ ...prevState, [field]: e.target.value }));
  };

  const handelFormSubmit = async (formData) => {
    const result = await registerMutation(formData);
    if (result.error) {
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
        boxShadow="lg"
      >
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
          <InputGroup size="md">
            <Input
              variant="filled"
              mb={3}
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="************"
              value={formData.password}
              onChange={(e) => handleInputChange(e, "password")}
            />
            <InputRightElement width="4.5rem">
              <IconButton h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <ViewOffIcon /> : <ViewIcon />}
              </IconButton>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="teal"
          mb={8}
          onClick={() => handelFormSubmit(formData)}
        >
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
