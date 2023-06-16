import React, { useState } from "react";

import {
  Stack,
  Spinner,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { useGetAppointmentsQuery } from "../store/api-slice";
import AppointmentView from "./AppointmentView";

function AppointmentsGridView() {
  const { data: appointments, isSuccess } = useGetAppointmentsQuery();

  const [passportNumberFilter, SetPassportNumberFilter] = useState("");

  return (
    <Stack spacing={5}>
      <Card variant="outline">
        <CardBody>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormControl>
              <FormLabel>Applicant Passport Number</FormLabel>
              <Input
                variant="filled"
                type="text"
                value={passportNumberFilter}
                placeholder="Search by passport number"
                onChange={(e) => SetPassportNumberFilter(e.target.value)}
              />
            </FormControl>
          </form>
        </CardBody>
      </Card>
      <Stack spacing={5} align="stretch" justify="center">
        {isSuccess ? (
          appointments
            .filter(
              (appointment) =>
                appointment.applicants.length === 0 ||
                appointment.applicants.some((applicant) =>
                  applicant.passportNumber.startsWith(passportNumberFilter)
                )
            )
            .map((appointment) => (
              <AppointmentView
                key={appointment._id}
                appointment={appointment}
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
