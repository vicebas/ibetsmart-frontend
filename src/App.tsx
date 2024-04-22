import './App.css'
import {BrowserRouter} from "react-router-dom";
import Routes from "./Routes";
import {UserProvider} from "./context/UserContext";
import {Container} from "@chakra-ui/react";

function App() {

  return (
      <Container maxW="container.lg">
        <BrowserRouter>
            <UserProvider>
                <Routes/>
            </UserProvider>
        </BrowserRouter>
        </Container>
  )
}

export default App
