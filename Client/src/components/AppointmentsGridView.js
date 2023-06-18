import React, { useState } from "react";

import {
  Stack,
  Spinner,
  Card,
  CardBody,
  FormControl,
  Input,
  Select,
} from "@chakra-ui/react";

import { useGetAppointmentsQuery } from "../store/api-slice";
import AppointmentView from "./AppointmentView";
import Search from "./Search";
import Filter from "./Filter";

function AppointmentsGridView() {
  const [term, setTerm] = useState("");
  const [filterField, setFilterFields] = useState({
    owner: "",
    visa: "",
    status: "",
  });

  const { data, isSuccess, isLoading } = useGetAppointmentsQuery(filterField);

  return (
    <Stack spacing={5}>
      {/* Search & Filters */}
      <Card variant="outline" size="sm">
        <CardBody>
          <Stack>
            <Search term={term} setTerm={setTerm} />
            <Filter
              filterField={filterField}
              setFilterFields={setFilterFields}
              data={data}
              isSuccess={isSuccess}
            />
          </Stack>
        </CardBody>
      </Card>
      {/* Appointmets */}
      <Stack spacing={5} align="stretch" alignItems="center">
        {!isLoading ? (
          isSuccess &&
          data.payload
            .filter(
              (appointment) =>
                appointment.applicants.length === 0 ||
                appointment.applicants.some((applicant) =>
                  applicant.passportNumber.startsWith(term)
                )
            )
            .map((appointment) => (
              <AppointmentView
                key={appointment._id}
                appointment={appointment}
                attributes={data.attributes}
              />
            ))
        ) : (
          <Spinner
            margin={10}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
      </Stack>
    </Stack>
  );
}

export default AppointmentsGridView;
