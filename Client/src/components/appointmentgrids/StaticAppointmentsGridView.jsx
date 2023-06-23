import React from "react";

import { Stack, Spinner } from "@chakra-ui/react";
import { useGetAppointmentsQuery } from "../../store/api-slice";
import StaticAppointmentView from "../appointmentviews/StaticAppointmentView";

function StaticAppointmentsGridView() {
  const { data, isSuccess, isLoading } = useGetAppointmentsQuery({
    owner: "",
    status: "",
    visa: "",
  });

  return (
    <Stack spacing={5}>
      {!isLoading ? (
        isSuccess &&
        data.payload.map((appointment) => (
          <StaticAppointmentView
            key={appointment._id}
            appointment={appointment}
            attributes={data.attributes}
          />
        ))
      ) : (
        <Stack alignItems="center">
          <Spinner
            margin={10}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Stack>
      )}
    </Stack>
  );
}

export default StaticAppointmentsGridView;
