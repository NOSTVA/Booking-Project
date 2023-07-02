import React, { useState, useEffect } from "react";
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
  Checkbox,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
  PopoverContent,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Code,
  PopoverFooter,
  ButtonGroup,
} from "@chakra-ui/react";

import {
  DeleteIcon,
  CopyIcon,
  DragHandleIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";

import {
  useDeleteApplicantMutation,
  useUpdateApplicantMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAllUsersQuery,
  useDeassignUserMutation,
  useAssignUserMutation,
} from "../../store/api-slice";

function AppointmentEditableView({ appointment, attributes }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  const [deassignUser] = useDeassignUserMutation();
  const [assignUser] = useAssignUserMutation();

  const { data: users, isLoading: isUsersLoading } = useGetAllUsersQuery();

  const [usersState, setUsersState] = useState({});

  useEffect(() => {
    if (!isUsersLoading) {
      const states = {};
      users.map(
        (user) => (states[user._id] = isUserAssigned(user._id, appointment))
      );

      setUsersState(states);
    }
  }, [appointment, isUsersLoading, users]);

  // controllers
  function isUserAssigned(id, appointment) {
    return appointment.assignedUsers.includes(id);
  }

  async function handleUserChange(e, { userId, appointmentId }) {
    const isChecked = e.target.checked;
    if (isChecked) {
      await assignUser({ userId, appointmentId });
    } else {
      await deassignUser({ userId, appointmentId });
    }
    setUsersState((prevState) => ({ ...prevState, [userId]: isChecked }));
  }

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

  function getAppointmentCode(appointment) {
    const { applicants, email, phone, expectedTravelDate } = appointment;
    const newApplicants = applicants.map((applicant) => ({
      ...applicant,
      dateOfBirth: applicant.dateOfBirth.split("T")[0],
      expectedTravelDate: expectedTravelDate.split("T")[0],
      email,
      phone,
    }));

    return `
    
    applicants = ${JSON.stringify(newApplicants)}
    document
      .querySelector("app-no-form #phone")
      .dispatchEvent(new Event("ngModelChange"));
    
    applicants.map(async (applicant, index) => {
      await fillInput("surname", applicant.firstName, index);
      await fillInput("name", applicant.lastName, index);
      await fillInput("birthLocalDate", applicant.dateOfBirth, index);
      await fillInput("passport", applicant.passportNumber, index);
      await fillInput("applicantEmail", applicant.email, index);
      await fillInput("phone", applicant.phone, index);
      await fillInput(
        "expectedDepartureLocalDate",
        applicant.expectedTravelDate,
        index
      );
    });
    
    async function fillInput(field, value, folderIndex) {
      let ele = document.querySelectorAll(
        'app-no-form form input[name="' + field +'"]'
      )[folderIndex];
      ele.value = value;
      ele.dispatchEvent(new Event("input"));
      ele.dispatchEvent(new Event("change"));
      ele.dispatchEvent(new Event("compositionend"));
    }
    `;
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
                    variant="simple">
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
                            }>
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
                            }}>
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
                            }>
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
                            }}>
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
                            }>
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
                            }}>
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
                            }>
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
              <Tooltip label="Assign" placement="right">
                <IconButton
                  aria-label="Assign"
                  size="sm"
                  icon={<DragHandleIcon />}
                  onClick={() => {
                    onOpen();
                  }}
                  variant="outline"
                />
              </Tooltip>
              <Popover placement="left" isLazy>
                <PopoverTrigger>
                  <IconButton
                    aria-label="Copy code"
                    size="sm"
                    icon={<CopyIcon />}
                  />
                </PopoverTrigger>
                <PopoverContent width={600} textAlign="left">
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
                        }>
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
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Users</ModalHeader>
          <ModalCloseButton />
          {/* ============================================================================= */}
          <ModalBody>
            <Stack>
              {!isUsersLoading &&
                users.map(({ email, _id }) => (
                  <Checkbox
                    key={_id}
                    onChange={(e) =>
                      handleUserChange(e, { userId: _id, appointmentId })
                    }
                    isChecked={usersState[_id]}>
                    {email}
                  </Checkbox>
                ))}
            </Stack>
          </ModalBody>
          {/* ============================================================================= */}

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
              }}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isCentered={true}
        isOpen={isAvatarModalOpen}
        onClose={() => onApplicantAvatarClose()}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Image src={selectedImage} alt="Error in the image link" />
          <Stack spacing={4}>
            <Text
              fontSize="sm"
              fontStyle="italic"
              color="gray.500"
              mt="2"
              mr="10">
              {selectedImage.alt}
            </Text>
            <IconButton
              target="_blank"
              href={selectedImage}
              icon={<ExternalLinkIcon />}
              as={Link}></IconButton>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AppointmentEditableView;
