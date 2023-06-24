import React, { useContext } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  HStack,
  Collapse,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import UserContext from "../context/userContext";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      left={0}
      zIndex={99}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.300", "gray.600")}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
        maxWidth={1300}
        mx="auto">
        <Flex flex={{ base: 1 }} justify={{ base: "start" }}>
          <Logo />
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Flex ml={{ base: -2 }}>
          <HStack>
            <Button to="/logout" as={Link} size="sm">
              Log out
            </Button>
            <Flex display={{ base: "flex", md: "none" }}>
              <IconButton
                size="sm"
                onClick={onToggle}
                icon={
                  isOpen ? (
                    <CloseIcon w={3} h={3} />
                  ) : (
                    <HamburgerIcon w={5} h={5} />
                  )
                }
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />
            </Flex>
          </HStack>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  const { user, isLoading } = useContext(UserContext);

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => {
        if (navItem.adminOnly && user.role !== "admin") {
          return null;
        }

        return (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link
                  p={2}
                  to={navItem.href ?? "#"}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
              </PopoverTrigger>
            </Popover>
          </Box>
        );
      })}

      {!isLoading && user.role === "admin" && (
        <Box>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                to="/admin">
                Admin Dashboard
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      )}
    </Stack>
  );
};

const MobileNav = () => {
  const { user, isLoading } = useContext(UserContext);
  const bgColor = useColorModeValue("white", "gray.800");

  if (isLoading) {
    return null;
  }

  return (
    <Stack bg={bgColor} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => {
        if (navItem.adminOnly && user.role !== "admin") {
          return null;
        }
        return <MobileNavItem key={navItem.label} {...navItem} />;
      })}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        to={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}>
          {label}
        </Text>
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}></Stack>
      </Collapse>
    </Stack>
  );
};

const Logo = () => {
  return (
    <Text
      as="b"
      textAlign={useBreakpointValue({ base: "center", md: "left" })}
      fontFamily={"heading"}
      color={useColorModeValue("gray.800", "white")}>
      BOOKING
    </Text>
  );
};

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    adminOnly: false,
  },
  {
    label: "Create Appointment",
    href: "/create",
    adminOnly: false,
  },
  {
    label: "My Dashboard",
    href: "/myappointments",
    adminOnly: false,
  },
];
