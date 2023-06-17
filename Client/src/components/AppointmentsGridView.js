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
    <Stack spacing={5}>
      <Card variant="outline" size="sm">
        <CardBody>
          <Stack>
            <form onSubmit={(e) => e.preventDefault()}>
              <FormControl>
                <Input
                  variant="filled"
                  type="text"
                  value={passportNumberFilter}
                  placeholder="Search by passport number"
                  onChange={(e) => SetPassportNumberFilter(e.target.value)}
                />
              </FormControl>
            </form>
            <Stack direction="row">
              <Select
                value={filterField.owner}
                onChange={(e) => onFilterChange("owner", e.target.value)}>
                <option value="">All</option>
                {isSuccess &&
                  data.attributes.ownerEmuns.map((value, index) => {
                    return (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    );
                  })}
              </Select>
              <Select
                value={filterField.visa}
                onChange={(e) => onFilterChange("visa", e.target.value)}>
                <option value="">All</option>
                {isSuccess &&
                  data.attributes.visaEmuns.map((value, index) => {
                    return (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    );
                  })}
              </Select>
              <Select
                value={filterField.status}
                onChange={(e) => onFilterChange("status", e.target.value)}>
                <option value="">All</option>
                {isSuccess &&
                  data.attributes.statusEmuns.map((value, index) => {
                    return (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    );
                  })}
              </Select>
            </Stack>
          </Stack>
        </CardBody>
      </Card>

      <Stack spacing={5} align="stretch" justify="center" alignItems="center">
        {!isLoading ? (
          isSuccess &&
          data.payload
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
