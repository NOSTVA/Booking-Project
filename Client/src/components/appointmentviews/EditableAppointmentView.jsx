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
} from "@chakra-ui/react";

import {
  DeleteIcon,
  LinkIcon,
  AddIcon,
  CopyIcon,
  DragHandleIcon,
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

import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const { data: users, isLoading: isUsersLoading } = useGetAllUsersQuery();

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
    navigate("/admin", { replace: true });
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
              <Tooltip label="Copy Code" placement="right">
                <IconButton
                  aria-label="Copy Code"
                  size="sm"
                  icon={<CopyIcon />}
                  variant="outline"
                />
              </Tooltip>
              <Tooltip label="Add applicant" placement="right">
                <IconButton
                  aria-label="Add Applicant"
                  size="sm"
                  icon={<AddIcon />}
                  variant="outline"
                />
              </Tooltip>
              <Tooltip label="Copy Link" placement="right">
                <IconButton
                  aria-label="Copy Link"
                  size="sm"
                  icon={<LinkIcon />}
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(appointmentId)}
                />
              </Tooltip>
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
                    isChecked={isUserAssigned(_id, appointment)}>
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
          <Image src={selectedImage} />
        </ModalContent>
      </Modal>
    </>
  );
}

export default AppointmentEditableView;