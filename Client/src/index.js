import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    light: {
      textColor: "#000",
      backgroundColor: "#fff",
    },
    dark: {
      textColor: "#fff",
      backgroundColor: "#000",
    },
  },
};

const theme = extendTheme({ config });

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
