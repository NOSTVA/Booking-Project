import React, { useContext, useState } from "react";
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
  IconButton,
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

import { useUpdateAppointmentMutation } from "../../store/api-slice";
import { AtSignIcon, CopyIcon } from "@chakra-ui/icons";
import { getAppointmentCode, getLoginCode } from "../../functions";

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

  const { statusEmuns } = attributes;

  const [selectedImage, setSelectedImage] = useState("");
  const [isAvatarModalOpen, SetIsAvatarModalOpen] = useState(false);
  const [editedValues, setEditedValues] = useState({});

  const [updateAppointment] = useUpdateAppointmentMutation();

  function onApplicantAvatarOpen(image) {
    setSelectedImage(image);
    SetIsAvatarModalOpen(true);
  }

  function onApplicantAvatarClose() {
    setSelectedImage("");
    SetIsAvatarModalOpen(false);
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
                          {expectedTravelDate.split("T")[0]}
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
                              maxLength="10"
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
                        <Td textAlign="center">{visa}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Text as="b">Mobile Number:</Text>
                        </Td>
                        <Td textAlign="center">{phone}</Td>
                        <Td>
                          <Text as="b">Owner:</Text>
                        </Td>
                        <Td textAlign="center">{owner}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Text as="b">Note:</Text>
                        </Td>
                        <Td textAlign="center" overflow="clip">
                          {note || "-"}
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
              <Popover placement="left" isLazy>
                <PopoverTrigger>
                  <IconButton
                    variant="outline"
                    aria-label="Copy code"
                    size="sm"
                    icon={<CopyIcon />}
                  />
                </PopoverTrigger>
                <PopoverContent height="full" width={600} textAlign="left">
                  <PopoverHeader fontWeight="semibold">Code</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Code whiteSpace="pre-wrap" sx={{ wordBreak: "break-all" }}>
                      {getAppointmentCode(appointment)}
                    </Code>
                  </PopoverBody>
                  <PopoverFooter display="flex" justifyContent="flex-end">
                    <ButtonGroup size="sm">
                      <Button
                        colorScheme="blue"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            getAppointmentCode(appointment)
                          )
                        }
                      >
                        Copy
                      </Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
              <Popover placement="left" isLazy>
                <PopoverTrigger>
                  <IconButton
                    variant="outline"
                    aria-label="Copy code"
                    size="sm"
                    icon={<AtSignIcon />}
                  />
                </PopoverTrigger>
                <PopoverContent width={600} textAlign="left">
                  <PopoverHeader fontWeight="semibold">Code</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Code
                      width="full"
                      whiteSpace="pre-wrap"
                      sx={{ wordBreak: "break-all" }}
                    >
                      {getLoginCode(appointment.email)}
                    </Code>
                  </PopoverBody>
                  <PopoverFooter display="flex" justifyContent="flex-end">
                    <ButtonGroup size="sm">
                      <Button
                        colorScheme="blue"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            getLoginCode(appointment.email)
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
                        <Td textAlign="center">{firstName}</Td>

                        {/* LAST NAME */}
                        <Td textAlign="center">{lastName}</Td>

                        {/* PASSPORT */}
                        <Td textAlign="center">{passportNumber}</Td>

                        {/* DATE OF BIRTH */}
                        <Td textAlign="center">{dateOfBirth.split("T")[0]}</Td>
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
