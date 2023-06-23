import React, { useState } from "react";

import AdminAppointmentsGridView from "../components/appointmentgrids/AdminAppointmentsGridView";
import Navbar from "../components/Navbar";
import Body from "../components/Body";

import { Container } from "@chakra-ui/react";
import { useGetAppointmentsQuery } from "../store/api-slice";

function Admin() {
  const [filterField, setFilterFields] = useState({
    owner: "",
    visa: "",
    status: "",
  });

  const { data, isSuccess, isLoading } = useGetAppointmentsQuery(filterField);

  return (
    <Container maxW="6xl">
      <Navbar />
      <Body>
        <AdminAppointmentsGridView
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

export default Admin;
