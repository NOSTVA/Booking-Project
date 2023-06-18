import React from "react";

import AppointmentsGridView from "../components/AppointmentsGridView";

import { Container, useColorMode } from "@chakra-ui/react";

function Dashboard() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="6xl" py={10}>
      <AppointmentsGridView />
    </Container>
  );
}

export default Dashboard;
