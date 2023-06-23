import { Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Body from "../components/Body";
import StaticAppointmentsGridView from "../components/appointmentgrids/StaticAppointmentsGridView";

const Home = () => {
  return (
    <Container maxW="6xl">
      <Navbar />
      <Body>
        <StaticAppointmentsGridView />
      </Body>
    </Container>
  );
};

export default Home;
