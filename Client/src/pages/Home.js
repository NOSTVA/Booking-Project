import MainForm from "../components/MainForm";
import { Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <Container maxW="6xl" py={10}>
      <Navbar />
      <MainForm />
    </Container>
  );
};

export default Home;
