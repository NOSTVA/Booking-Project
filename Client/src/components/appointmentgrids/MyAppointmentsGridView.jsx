import React, { useState } from "react";

import {
  Stack,
  Spinner,
  Card,
  CardBody,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import MyAppointmentView from "../appointmentviews/MyAppointmentView";
import AssignedAppointmentView from "../appointmentviews/AssignedAppointmentView";
import Filter from "../Filter";

export default function MyAppointmentsGridView({
  filterField,
  setFilterFields,
  data,
  isSuccess,
  isLoading,
}) {
  const [term] = useState("");

  return (
    <Stack spacing={5}>
      {/* Search & Filters */}
      <Card variant="outline" size="sm">
        <CardBody>
          <Stack>
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

      <Tabs>
        <TabList>
          <Tab>Created</Tab>
          <Tab>Assigned</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack spacing={5}>
              {!isLoading ? (
                isSuccess &&
                data.payload.createdAppointments
                  .filter(
                    (appointment) =>
                      appointment.applicants.length === 0 ||
                      appointment.applicants.some((applicant) =>
                        applicant.passportNumber.startsWith(term)
                      )
                  )
                  .map((appointment) => (
                    <MyAppointmentView
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
          </TabPanel>
          <TabPanel>
            <Stack spacing={5}>
              {!isLoading ? (
                isSuccess &&
                data.payload.assignedAppointments
                  .filter(
                    (appointment) =>
                      appointment.applicants.length === 0 ||
                      appointment.applicants.some((applicant) =>
                        applicant.passportNumber.startsWith(term)
                      )
                  )
                  .map((appointment) => (
                    <AssignedAppointmentView
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}
