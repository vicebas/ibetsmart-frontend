import { useState, useContext } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    FormControl,
    InputRightElement, ChakraProvider
} from "@chakra-ui/react";
import { Center} from '@chakra-ui/react'
import { FaUserAlt, FaLock } from "react-icons/fa";
import  UserContext from "../context/UserContext";
import {useNavigate} from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
    const {handleLogin} = useContext(UserContext)
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleShowClick = () => setShowPassword(!showPassword);

    const handleClick = () => {
        handleLogin({email, password});
    }


    return (

        <ChakraProvider>
        <Center>
            <Box
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
            >
                <Stack spacing={4}>
                    <Heading textAlign="center">Login</Heading>
                    <FormControl id="email">
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<CFaUserAlt color="gray.300" />}
                            />
                            <Input type="email"
                                   onChange={(e) => setEmail(e.target.value)}
                                   placeholder="Email address" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="password">
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                children={<CFaLock color="gray.300" />}
                            />
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                    {showPassword ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button onClick={handleClick} colorScheme="teal" size="lg">
                        Login
                    </Button>
                    <Flex justifyContent="space-between">
                        <Link onClick={() => navigate("/signup")} color="teal.500">Sign up</Link>
                        <Link color="teal.500">Forget Password?</Link>
                    </Flex>
                </Stack>
            </Box>
        </Center>
        </ChakraProvider>
    );
};


export default LoginPage;