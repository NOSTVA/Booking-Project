import React from "react";

import AppointmentsGridView from "../components/AppointmentsGridView";
import Navbar from "../components/Navbar";

import { Container, useColorMode } from "@chakra-ui/react";

function Dashboard() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="6xl" py={10}>
      <Navbar />
      <AppointmentsGridView />
    </Container>
  );
}

export default Dashboard;
