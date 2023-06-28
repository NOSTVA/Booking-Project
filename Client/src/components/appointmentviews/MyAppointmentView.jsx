import React, { useState } from "react";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Select,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  Tooltip,
  Card,
  CardBody,
  Avatar,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Code,
  PopoverFooter,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

import { DeleteIcon, LinkIcon, AddIcon, CopyIcon } from "@chakra-ui/icons";

import {
  useDeleteApplicantMutation,
  useUpdateApplicantMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} from "../../store/api-slice";

function AppointmentEditableView({ appointment, attributes }) {
  const {
    _id: appointmentId,
    applicants,
    numberOfApplicants,
    expectedTravelDate,
    email,
    phone,
    note,
    status,
    owner,
    visa,
  } = appointment;

  const { ownerEmuns, visaEmuns, statusEmuns } = attributes;

  const [selectedImage, setSelectedImage] = useState("");
  const [isAvatarModalOpen, SetIsAvatarModalOpen] = useState(false);
  const [editedValues, setEditedValues] = useState({});

  const [deleteApplicant] = useDeleteApplicantMutation();
  const [updateApplicant] = useUpdateApplicantMutation();
  const [updateAppointment] = useUpdateAppointmentMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  // controllers
  function onApplicantAvatarOpen(image) {
    setSelectedImage(image);
    SetIsAvatarModalOpen(true);
  }

  function onApplicantAvatarClose() {
    setSelectedImage("");
    SetIsAvatarModalOpen(false);
  }

  function handleDeleteClick(_id) {
    deleteApplicant(_id);
  }

  async function handleEditClick(_id) {
    const result = await updateApplicant({
      id: _id,
      data: editedValues[_id],
    });
    setEditedValues((prevState) => {
      const newState = { ...prevState };
      delete newState[_id];
      return newState;
    });
    console.log("result", result);
  }

  function handleCancelClick(_id) {
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
    setEditedValues((prevState) => ({
      ...prevState,
      [_id]: {
        ...prevState[_id],
        [property]: applicants.find((applicant) => applicant._id === _id)[
          property
        ],
      },
    }));
  }

  function getApplicantCode({
    firstName,
    lastName,
    passportNumber,
    dateOfBirth,
    expectedTravelDate,
    email,
    phone,
  }) {
    return `
    const email = "${email}";
    const expectedDeparture = "${expectedTravelDate.split("T")[0]}";
    const phone = "${phone}";
    const firstName = "${firstName}";
    const lastName = "${lastName}";
    const passport = "${passportNumber}";
    const birthLocalDate = "${dateOfBirth.split("T")[0]}";
        
    function fill(element, data) {
      element.value = data;
      element.dispatchEvent(new Event("input"));
      element.dispatchEvent(new Event("change"));
      element.dispatchEvent(new Event("compositionend"));
    }
    let i = 0
    document
      .querySelector("app-no-form #phone")
      .dispatchEvent(new Event("ngModelChange"));
    fill(document.querySelectorAll("app-no-form #applicantEmail")[i], email);
    fill(
      document.querySelectorAll("app-no-form #expectedDepartureLocalDate")[i],
      expectedDeparture
    );
    fill(document.querySelectorAll("app-no-form #phone")[i], phone);
    fill(document.querySelectorAll("app-no-form #surname")[i], firstName);
    fill(document.querySelectorAll("app-no-form #name")[i], lastName);
    fill(document.querySelectorAll("app-no-form #passport")[i], passport);
    fill(
      document.querySelectorAll("app-no-form #birthLocalDate")[i],
      birthLocalDate
    );
    `;
  }

  function handleAppointmentEditClick(_id) {
    updateAppointment({
      id: _id,
      data: editedValues[_id],
    });
    setEditedValues((prevState) => {
      const newState = { ...prevState };
      delete newState[_id];
      return newState;
    });
  }

  function handleAppointmentEdit(_id, property) {
    setEditedValues((prevState) => ({
      ...prevState,
      [_id]: {
        ...prevState[_id],
        [property]: appointment[property],
      },
    }));
  }

  const layout = useBreakpointValue({ base: "default", md: "fixed" });

  return (
    <>
      <Card variant="outline" size="sm">
        <CardBody>
          <Stack direction="row">
            <Card mb={5} size="sm" width="full">
              <CardBody>
                <TableContainer>
                  <Table
                    size="sm"
                    layout={layout}
                    width="full"
                    variant="simple"
                  >
                    <Tbody>
                      <Tr>
                        <Td>
                          <Text as="b">Expected Travel Date:</Text>
                        </Td>
                        <Td textAlign="center" overflow="clip">
                          <Editable
                            value={
                              editedValues[
                                appointmentId
                              ]?.expectedTravelDate?.split("T")[0] ??
                              expectedTravelDate.split("T")[0]
                            }
                            onSubmit={() =>
                              handleAppointmentEditClick(appointmentId)
                            }
                            onCancel={() => handleCancelClick(appointmentId)}
                            submitOnBlur={false}
                            onEdit={() =>
                              handleAppointmentEdit(
                                appointmentId,
                                "expectedTravelDate"
                              )
                            }
                          >
                            <Tooltip label="Click to edit">
                              <EditablePreview />
                            </Tooltip>
                            <EditableInput
                              onChange={(e) =>
                                handleChange(
                                  appointmentId,
                                  "expectedTravelDate",
                                  e.target.value
                                )
                              }
                            />
                          </Editable>
                        </Td>
                        <Td>
                          <Text as="b">Status:</Text>
                        </Td>
                        <Td>
                          <Select
                            textAlign="center"
                            size="sm"
                            value={
                              editedValues[appointmentId]?.status ?? status
                            }
                            onChange={(e) => {
                              updateAppointment({
                                id: appointmentId,
                                data: { status: e.target.value },
                              });
                            }}
                          >
                            {statusEmuns.map((value, index) => (
                              <option key={index} value={value}>
                                {value}
                              </option>
                            ))}
                          </Select>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Text as="b">Email:</Text>
                        </Td>
                        <Td textAlign="center" overflow="clip">
                          <Editable
                            value={editedValues[appointmentId]?.email ?? email}
                            onSubmit={() =>
                              handleAppointmentEditClick(appointmentId)
                            }
                            onCancel={() => handleCancelClick(appointmentId)}
                            submitOnBlur={false}
                            onEdit={() =>
                              handleAppointmentEdit(appointmentId, "email")
                            }
                          >
                            <Tooltip label="Click to edit">
                              <EditablePreview />
                            </Tooltip>
                            <EditableInput
                              onChange={(e) =>
                                handleChange(
                                  appointmentId,
                                  "email",
                                  e.target.value
                                )
                              }
                            />
                          </Editable>
                        </Td>

                        <Td>
                          <Text as="b">Visa:</Text>
                        </Td>
                        <Td textAlign="center">
                          <Select
                            textAlign="center"
                            size="sm"
                            value={editedValues[appointmentId]?.visa ?? visa}
                            onChange={(e) => {
                              updateAppointment({
                                id: appointmentId,
                                data: { visa: e.target.value },
                              });
                            }}
                          >
                            {visaEmuns.map((value, index) => (
                              <option key={index} value={value}>
                                {value}
                              </option>
                            ))}
                          </Select>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Text as="b">Mobile Number:</Text>
                        </Td>
                        <Td textAlign="center">
                          <Editable
                            value={editedValues[appointmentId]?.phone ?? phone}
                            onSubmit={() =>
                              handleAppointmentEditClick(appointmentId)
                            }
                            onCancel={() => handleCancelClick(appointmentId)}
                            submitOnBlur={false}
                            onEdit={() =>
                              handleAppointmentEdit(appointmentId, "phone")
                            }
                          >
                            <Tooltip label="Click to edit">
                              <EditablePreview />
                            </Tooltip>
                            <EditableInput
                              onChange={(e) =>
                                handleChange(
                                  appointmentId,
                                  "phone",
                                  e.target.value
                                )
                              }
                            />
                          </Editable>
                        </Td>
                        <Td>
                          <Text as="b">Owner:</Text>
                        </Td>
                        <Td textAlign="center">
                          <Select
                            textAlign="center"
                            size="sm"
                            value={editedValues[appointmentId]?.owner ?? owner}
                            onChange={(e) => {
                              updateAppointment({
                                id: appointmentId,
                                data: { owner: e.target.value },
                              });
                            }}
                          >
                            {ownerEmuns.map((value, index) => (
                              <option key={index} value={value}>
                                {value}
                              </option>
                            ))}
                          </Select>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Text as="b">Note:</Text>
                        </Td>
                        <Td textAlign="center" overflow="clip">
                          <Editable
                            value={
                              editedValues[appointmentId]?.note ?? (note || "-")
                            }
                            onSubmit={() =>
                              handleAppointmentEditClick(appointmentId)
                            }
                            onCancel={() => handleCancelClick(appointmentId)}
                            submitOnBlur={false}
                            onEdit={() =>
                              handleAppointmentEdit(appointmentId, "note")
                            }
                          >
                            <Tooltip label="Click to edit">
                              <EditablePreview width="full" />
                            </Tooltip>
                            <EditableInput
                              onChange={(e) =>
                                handleChange(
                                  appointmentId,
                                  "note",
                                  e.target.value
                                )
                              }
                            />
                          </Editable>
                        </Td>

                        <Td>
                          <Text as="b">No. Applicants:</Text>
                        </Td>
                        <Td textAlign="center">
                          <Text>{numberOfApplicants.toString()}</Text>
                        </Td>

                        {/* asdasdasd */}
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
            <Stack>
              <Tooltip label="Delete" placement="right">
                <IconButton
                  aria-label="Delete"
                  size="sm"
                  icon={<DeleteIcon />}
                  variant="outline"
                  onClick={() => deleteAppointment(appointmentId)}
                />
              </Tooltip>
            </Stack>
          </Stack>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th textAlign="center">Image</Th>
                  <Th textAlign="center">First Name</Th>
                  <Th textAlign="center">Last Name</Th>
                  <Th textAlign="center">Passport</Th>
                  <Th textAlign="center">Date Of Birth</Th>
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
                      passportNumber,
                      dateOfBirth,
                      image,
                    }) => (
                      <Tr key={_id}>
                        {/* AVATAR */}
                        <Td textAlign="center">
                          <Avatar
                            style={{ cursor: "pointer" }}
                            src={image}
                            onClick={() => onApplicantAvatarOpen(image)}
                          />
                        </Td>

                        {/* FIRST NAME */}
                        <Td textAlign="center">
                          <Editable
                            value={editedValues[_id]?.firstName ?? firstName}
                            onSubmit={() => handleEditClick(_id)}
                            onCancel={() => handleCancelClick(_id)}
                            submitOnBlur={false}
                            onEdit={() => handleEdit(_id, "firstName")}
                          >
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
                            onEdit={() => handleEdit(_id, "lastName")}
                          >
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
                            onEdit={() => handleEdit(_id, "passportNumber")}
                          >
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
                            onEdit={() => handleEdit(_id, "dateOfBirth")}
                          >
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

                        {/* DELETE */}
                        <Td textAlign="center">
                          <Stack
                            direction="row"
                            align="center"
                            justify="center"
                          >
                            <IconButton
                              aria-label="Delete"
                              size="sm"
                              icon={<DeleteIcon />}
                              onClick={() => handleDeleteClick(_id)}
                            />
                            <Popover placement="left" isLazy>
                              <PopoverTrigger>
                                <IconButton
                                  aria-label="Copy code"
                                  size="sm"
                                  icon={<CopyIcon />}
                                />
                              </PopoverTrigger>
                              <PopoverContent width={600} textAlign="left">
                                <PopoverHeader fontWeight="semibold">
                                  Code
                                </PopoverHeader>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverBody>
                                  <Code whiteSpace="pre-wrap">
                                    {getApplicantCode({
                                      firstName,
                                      lastName,
                                      passportNumber,
                                      dateOfBirth,
                                      expectedTravelDate,
                                      email,
                                      phone,
                                    })}
                                  </Code>
                                </PopoverBody>
                                <PopoverFooter
                                  display="flex"
                                  justifyContent="flex-end"
                                >
                                  <ButtonGroup size="sm">
                                    <Button
                                      colorScheme="blue"
                                      onClick={() =>
                                        navigator.clipboard.writeText(
                                          getApplicantCode({
                                            firstName,
                                            lastName,
                                            passportNumber,
                                            dateOfBirth,
                                            expectedTravelDate,
                                            email,
                                            phone,
                                          })
                                        )
                                      }
                                    >
                                      Copy
                                    </Button>
                                  </ButtonGroup>
                                </PopoverFooter>
                              </PopoverContent>
                            </Popover>
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
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
      <Modal
        isCentered={true}
        isOpen={isAvatarModalOpen}
        onClose={() => onApplicantAvatarClose()}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Image src={selectedImage} />
        </ModalContent>
      </Modal>
    </>
  );
}

export default AppointmentEditableView;
