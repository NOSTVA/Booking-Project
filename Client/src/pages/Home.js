import MainForm from "../components/MainForm";
import { Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Body from "../components/Body";
import Public from "./Public";

const Home = () => {
  return (
    <Container maxW="6xl">
      <Navbar />
      <Body>
        <Public />
      </Body>
    </Container>
  );
};

export default Home;
