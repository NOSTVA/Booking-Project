import React, { useState } from "react";

import MyAppointmentsGridView from "../components/appointmentgrids/MyAppointmentsGridView";
import Navbar from "../components/Navbar";
import Body from "../components/Body";

import { Container } from "@chakra-ui/react";
import { useGetMyAppointmentsQuery } from "../store/api-slice";

function MyAppointments() {
  const [filterField, setFilterFields] = useState({
    owner: "",
    visa: "",
    status: "",
  });

  const { data, isSuccess, isLoading } = useGetMyAppointmentsQuery(filterField);

  return (
    <Container maxW="6xl">
      <Navbar />
      <Body>
        <MyAppointmentsGridView
          data={data}
          isSuccess={isSuccess}
          isLoading={isLoading}
          filterField={filterField}
          setFilterFields={setFilterFields}
        />
      </Body>
    </Container>
  );
}

export default MyAppointments;
