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
  Card,
  CardBody,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";

function AppointmentStaticView({ appointment, attributes }) {
  const {
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

  const [selectedImage, setSelectedImage] = useState("");
  const [isAvatarModalOpen, SetIsAvatarModalOpen] = useState(false);

  // controllers
  function onApplicantAvatarOpen(image) {
    setSelectedImage(image);
    SetIsAvatarModalOpen(true);
  }

  function onApplicantAvatarClose() {
    setSelectedImage("");
    SetIsAvatarModalOpen(false);
  }

  return (
    <>
      <Card variant="outline" size="sm">
        <CardBody>
          <Stack direction="row">
            <Card mb={5} size="sm" width="full">
              <CardBody>
                <TableContainer>
                  <Table size="sm" width="full" variant="simple">
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
                        <Td textAlign="center">{status}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Text as="b">Email:</Text>
                        </Td>
                        <Td textAlign="center" overflow="clip">
                          {email}
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
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
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

export default AppointmentStaticView;
