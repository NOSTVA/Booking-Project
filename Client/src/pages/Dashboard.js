import React from "react";

import AppointmentsGridView from "../components/AppointmentsGridView";

import { Container, useColorMode, Button } from "@chakra-ui/react";

function Dashboard() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="6xl" py={10}>
      <Button onClick={toggleColorMode} mb={5}>
        {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <AppointmentsGridView />
    </Container>
  );
}

export default Dashboard;
