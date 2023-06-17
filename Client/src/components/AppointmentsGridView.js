import React, { useEffect, useState } from "react";

import {
  Stack,
  Spinner,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Container,
} from "@chakra-ui/react";

import { useGetAppointmentsQuery } from "../store/api-slice";
import AppointmentView from "./AppointmentView";

function AppointmentsGridView() {
  const [passportNumberFilter, SetPassportNumberFilter] = useState("");
  const [filterField, setFilterFields] = useState({
    owner: "",
    visa: "",
    status: "",
  });

  const { data, isSuccess, isLoading } = useGetAppointmentsQuery(filterField);

  function onFilterChange(field, value) {
    setFilterFields((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <Container maxW="6xl" py={10}>
      MainForm
    </Container>
  );
}

export default AppointmentsGridView;
