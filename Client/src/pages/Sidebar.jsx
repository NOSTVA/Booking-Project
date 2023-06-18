import {
  Box,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdCreate, MdDashboard, MdMenu, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
function Sidebar({ isOpen, onClose }) {
  return (
    <Box
      position="fixed"
      right="0"
      top="0"
      height="100vh"
      width="300px"
      bg={useColorModeValue("gray.200", "gray.700")}
      borderLeftWidth="1px"
      borderLeftColor={useColorModeValue("gray.300", "gray.600")}
      transition="all 0.2s"
      zIndex={10}
      transform={isOpen ? "translateX(0)" : "translateX(100%)"}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        px="4"
        py="3"
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.300", "gray.600")}
      >
        <Link to="/"><Text>My App</Text></Link>

        <IconButton
          icon={<Icon as={MdMenu} />}
          variant="ghost"
          onClick={onClose}
          size="sm"
        />
      </Flex>
      <Stack spacing="1" mt="4" px="4">
        <Link to="/dashboard" onClick={onClose}>
          <Flex alignItems="center">
            <Icon as={MdDashboard} mr="2" />
            <Text>Dashboard</Text>
          </Flex>
        </Link>
        <Link to="/" onClick={onClose}>
          <Flex alignItems="center">
            <Icon as={MdCreate} mr="2" />
            <Text>Create Appointment</Text>
          </Flex>
        </Link>
        <Link to="/user" onClick={onClose}>
          <Flex alignItems="center">
            <Icon as={MdPerson} mr="2" />
            <Text>User</Text>
          </Flex>
        </Link>
      </Stack>
    </Box>
  );
}

export default Sidebar;
