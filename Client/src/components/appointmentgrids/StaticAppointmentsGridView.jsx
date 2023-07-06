import React, { useState } from "react";

import { Stack, Spinner, Card, CardBody } from "@chakra-ui/react";
import { useGetAppointmentsQuery } from "../../store/api-slice";
import StaticAppointmentView from "../appointmentviews/StaticAppointmentView";
import Filter from "../Filter";
import Search from "../Search";

function StaticAppointmentsGridView() {
  const [filterField, setFilterFields] = useState({
    owner: "",
    visa: "",
    status: "",
  });
  const [term, setTerm] = useState("");
  const { data, isSuccess, isLoading } = useGetAppointmentsQuery(filterField);
  return (
    <Stack spacing={5}>
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
      {!isLoading ? (
        isSuccess &&
        data.payload
          .filter(
            (appointment) =>
              appointment.applicants.length === 0 ||
              appointment.applicants.some((applicant) =>
                applicant.passportNumber.startsWith(term.toUpperCase())
              )
          )
          .map((appointment) => (
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
