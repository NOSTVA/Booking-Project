import React, { useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Box,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Input,
  Tooltip,
  Spinner,
  Checkbox,
} from "@chakra-ui/react";

import { DeleteIcon, CopyIcon } from "@chakra-ui/icons";

function PersonsField({
  applicants,
  fetchApplicants,
  fetchApplicant,
  updateApplicant,
  deleteApplicant,
  loading,
}) {
  const [idValue, setIdValue] = useState("");
  const [editedValues, setEditedValues] = useState({});

  function handleDeleteClick(_id) {
    deleteApplicant(_id);
    setIdValue("");
  }

  function handleEditClick(_id) {
    updateApplicant(_id, editedValues[_id]);
    // Reset the edited values for the current row
    setEditedValues((prevState) => {
      const newState = { ...prevState };
      delete newState[_id];
      return newState;
    });
  }

  function handleCancelClick(_id) {
    // Reset the edited values for the current row
    setEditedValues((prevState) => {
      const newState = { ...prevState };
      delete newState[_id];
      return newState;
    });
  }

  function handleChange(_id, property, value) {
    setEditedValues((prevState) => ({
      ...prevState,
      [_id]: { ...prevState[_id], [property]: value },
    }));
  }

  function handleEdit(_id, property) {
    // Set the edited value for the current row and property
    setEditedValues((prevState) => ({
      ...prevState,
      [_id]: {
        ...prevState[_id],
        [property]: applicants.find((p) => p._id === _id)[property],
      },
    }));
  }

  return (
    <Stack spacing={5}>
      <Box
        padding={5}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        align="center"
        justify="center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchApplicant(idValue);
          }}>
          <FormControl>
            <FormLabel>Applicant ID</FormLabel>
            <Input
              type="text"
              value={idValue}
              placeholder="Enter Applicant ID"
              onChange={(e) => setIdValue(e.target.value)}
            />
          </FormControl>
        </form>
      </Box>
      <Box
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        align="center"
        justify="center">
        {!loading ? (
          <TableContainer>
            <Table size="sm" textAlign="center">
              <Thead>
                <Tr>
                  <Th textAlign="center">ID</Th>
                  <Th textAlign="center">First Name</Th>
                  <Th textAlign="center">Last Name</Th>
                  <Th textAlign="center">Email</Th>
                  <Th textAlign="center">Mobile</Th>
                  <Th textAlign="center">Passport</Th>
                  <Th textAlign="center">Date Of Birth</Th>
                  <Th textAlign="center">Issue Date</Th>
                  <Th textAlign="center">Note</Th>
                  <Th textAlign="center">Booked</Th>
                  <Th textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {applicants.length > 0 ? (
                  applicants.map(
                    ({
                      _id = null,
                      firstName,
                      lastName,
                      email,
                      mobileNumber,
                      passportNumber,
                      dateOfBirth,
                      issueDate,
                      note,
                      booked,
                    }) => (
                      <Tr key={_id}>
                        {/* ID */}
                        <Td textAlign="center">
                          <Stack
                            direction="row"
                            align="center"
                            justify="center">
                            <IconButton
                              aria-label="Copy"
                              size="sm"
                              icon={<CopyIcon />}
                              onClick={() => navigator.clipboard.writeText(_id)}
                            />
                          </Stack>
                        </Td>

                        {/* FIRST NAME */}
                        <Td textAlign="center">
                          <Editable
                            value={editedValues[_id]?.firstName ?? firstName}
                            onSubmit={() => handleEditClick(_id)}
                            onCancel={() => handleCancelClick(_id)}
                            submitOnBlur={false}
                            onEdit={() => handleEdit(_id, "firstName")}>
                            <Tooltip label="Click to edit">
                              <EditablePreview />
                            </Tooltip>
                            <EditableInput
                              onChange={(e) =>
                                handleChange(_id, "firstName", e.target.value)
                              }
                            />
                          </Editable>
                        </Td>

                        {/* LAST NAME */}
                        <Td textAlign="center">
                          <Editable
                            value={editedValues[_id]?.lastName ?? lastName}
                            onSubmit={() => handleEditClick(_id)}
                            onCancel={() => handleCancelClick(_id)}
                            submitOnBlur={false}
                            onEdit={() => handleEdit(_id, "lastName")}>
                            <Tooltip label="Click to edit">
                              <EditablePreview />
                            </Tooltip>
                            <EditableInput
                              onChange={(e) =>
                                handleChange(_id, "lastName", e.target.value)
                              }
                            />
                          </Editable>
                        </Td>

                        {/* EMAIL */}
                        <Td textAlign="center">
                          <Editable
                            value={editedValues[_id]?.email ?? email}
                            onSubmit={() => handleEditClick(_id)}
                            onCancel={() => handleCancelClick(_id)}
                            submitOnBlur={false}
                            onEdit={() => handleEdit(_id, "email")}>
                            <Tooltip label="Click to edit">
                              <EditablePreview />
                            </Tooltip>
                            <EditableInput
                              onChange={(e) =>
                                handleChange(_id, "email", e.target.value)
                              }
                            />
                          </Editable>
                        </Td>

                        {/* MOBILE */}
                        <Td textAlign="center">
                          <Editable
                            value={
                              editedValues[_id]?.mobileNumber ?? mobileNumber
                            }
                            onSubmit={() => handleEditClick(_id)}
                            onCancel={() => handleCancelClick(_id)}
                            submitOnBlur={false}
                            onEdit={() => handleEdit(_id, "mobileNumber")}>
                            <Tooltip label="Click to edit">
                              <EditablePreview />
                            </Tooltip>
                            <EditableInput
                              onChange={(e) =>
                                handleChange(
                                  _id,
                                  "mobileNumber",
                                  e.target.value
                                )
                              }
                            />
                          </Editable>
                        </Td>

                        {/* PASSPORT */}
                        <Td textAlign="center">
                          <Editable
                            value={
                              editedValues[_id]?.passportNumber ??
                              passportNumber
                            }
                            onSubmit={() => handleEditClick(_id)}
                            onCancel={() => handleCancelClick(_id)}
                            submitOnBlur={false}
                            onEdit={() => handleEdit(_id, "passportNumber")}>
                            <Tooltip label="Click to edit">
                              <EditablePreview />
                            </Tooltip>
                            <EditableInput
                              onChange={(e) =>
                                handleChange(
                                  _id,
                                  "passportNumber",
                                  e.target.value
                                )
                              }
                            />
                          </Editable>
                        </Td>

                        {/* DATE OF BIRTH */}
                        <Td textAlign="center">
                          <Editable
                            value={
                              editedValues[_id]?.dateOfBirth?.split("T")[0] ??
                              dateOfBirth.split("T")[0]
                            }
                            onSubmit={() => handleEditClick(_id)}
                            onCancel={() => handleCancelClick(_id)}
                            submitOnBlur={false}
                            onEdit={() => handleEdit(_id, "dateOfBirth")}>
                            <Tooltip label="Click to edit">
                              <EditablePreview />
                            </Tooltip>
                            <EditableInput
                              onChange={(e) =>
                                handleChange(_id, "dateOfBirth", e.target.value)
                              }
                            />
                          </Editable>
                        </Td>

                        {/* ISSUE DATE */}
                        <Td textAlign="center">
                          <Editable
                            value={
                              editedValues[_id]?.issueDate?.split("T")[0] ??
                              issueDate.split("T")[0]
                            }
                            onSubmit={() => handleEditClick(_id)}
                            onCancel={() => handleCancelClick(_id)}
                            submitOnBlur={false}
                            onEdit={() => handleEdit(_id, "issueDate")}>
                            <Tooltip label="Click to edit">
                              <EditablePreview />
                            </Tooltip>
                            <EditableInput
                              onChange={(e) =>
                                handleChange(_id, "issueDate", e.target.value)
                              }
                            />
                          </Editable>
                        </Td>

                        {/* NOTE */}
                        <Td textAlign="center">
                          <Editable
                            value={editedValues[_id]?.note ?? note}
                            onSubmit={() => handleEditClick(_id)}
                            onCancel={() => handleCancelClick(_id)}
                            submitOnBlur={false}
                            onEdit={() => handleEdit(_id, "note")}>
                            <Tooltip label="Click to edit">
                              <EditablePreview minWidth="40px" bac />
                            </Tooltip>
                            <EditableInput
                              placeholder="Enter your note here..."
                              onChange={(e) =>
                                handleChange(_id, "note", e.target.value)
                              }
                            />
                          </Editable>
                        </Td>

                        <Td textAlign="center">
                          <Checkbox
                            isChecked={editedValues[_id]?.booked ?? booked}
                            onChange={(e) => {
                              handleChange(_id, "booked", e.target.checked);
                              updateApplicant(_id, {
                                booked: e.target.checked,
                              });
                              console.log(e.target.checked);
                            }}
                          />
                        </Td>

                        {/* DELETE */}
                        <Td textAlign="center">
                          <Stack
                            direction="row"
                            align="center"
                            justify="center">
                            <IconButton
                              aria-label="Delete"
                              size="sm"
                              icon={<DeleteIcon />}
                              onClick={() => handleDeleteClick(_id)}
                            />
                          </Stack>
                        </Td>
                      </Tr>
                    )
                  )
                ) : (
                  <Tr>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
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
      </Box>
    </Stack>
  );
}

export default PersonsField;
