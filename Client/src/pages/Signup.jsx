import React from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  Text,
  Link,
  Stack,
  HStack,
} from "@chakra-ui/react";

const Signup = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

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
        <Input
          placeholder="johndoe@gmail.com"
          type="email"
          variant="filled"
          mb={3}
        />
        <Input
          placeholder="+2001111111"
          type="number"
          variant="filled"
          mb={3}
        />
        <Input
          placeholder="**********"
          type="password"
          variant="filled"
          mb={6}
        />
        <Button colorScheme="teal" mb={8}>
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
