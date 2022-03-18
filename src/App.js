import logo from "./logo.svg";
import "./App.css";
import Rute from "./Routes";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@material-tailwind/react/tailwind.css";

function App() {
  return (
    <React.Fragment>
      <ChakraProvider>
        <Rute />
      </ChakraProvider>
    </React.Fragment>
  );
}

export default App;
