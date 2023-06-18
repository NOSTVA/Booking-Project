import MainForm from "../components/MainForm";
import { Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Body from "../components/Body";

const Home = () => {
  return (
    <Container maxW="6xl">
      <Navbar />
      <Body>
        <MainForm />
      </Body>
    </Container>
  );
};

export default Home;
