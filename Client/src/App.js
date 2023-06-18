import {
  Box,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateAppointment from "./pages/CreateAppointment";
import User from "./pages/User";
import Sidebar from "./pages/Sidebar";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <BrowserRouter>
      <Flex>
        <Sidebar isOpen={isOpen} onClose={onClose} />
        <Box flex="1" px="8" py="4">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            px={{ base: "4", md: "8" }}
            py="3"
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.300", "gray.600")}
          >
            <Text fontWeight="bold">My App</Text>
            <IconButton
              icon={<Icon as={MdMenu} />}
              variant="ghost"
              onClick={onOpen}
              size="md"
              display={{ base: "block", md: "block" }}
              mr="2"
            />
          </Flex>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<CreateAppointment />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </Box>
      </Flex>
    </BrowserRouter>
  );
}

export default App;
