import React from "react";

import AppointmentsGridView from "../components/AppointmentsGridView";
import Navbar from "../components/Navbar";
import Body from "../components/Body";

import { Container, useColorMode } from "@chakra-ui/react";

function Dashboard() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="6xl">
      <Navbar />
      <Body>
        <AppointmentsGridView />
      </Body>
    </Container>
  );
}

export default Dashboard;
