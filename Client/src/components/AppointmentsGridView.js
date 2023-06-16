import React from "react";

import { Stack, Spinner } from "@chakra-ui/react";

import { useGetAppointmentsQuery } from "../store/api-slice";
import AppointmentView from "./AppointmentView";

function AppointmentsGridView() {
  const { data: appointments, isSuccess } = useGetAppointmentsQuery();

  return (
    <Stack spacing={5}>
      <Stack spacing={5} align="stretch" justify="center">
        {isSuccess ? (
          appointments.map((appointment) => (
            <AppointmentView
              key={appointment._id}
              appointment={appointment}></AppointmentView>
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
