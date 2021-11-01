import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        margin: 0,
        padding: 0,
        minHeight: "100vh",
      },
    },
  },
});

export default theme;
