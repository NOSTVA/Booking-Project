import { Box } from "@chakra-ui/react";
import React from "react";

function Body({ children }) {
  return <Box my={20}>{children}</Box>;
}

export default Body;
