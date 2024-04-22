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
    InputRightElement,
    ChakraProvider
} from "@chakra-ui/react";
import { Center} from '@chakra-ui/react'
import { FaUserAlt, FaLock, FaEye, FaEyeSlash} from "react-icons/fa";
import  UserContext from "../context/UserContext";
import {useNavigate} from "react-router-dom";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);


const Signup = () => {
    const { handleSignup } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleShowClick = () => setShowPassword(!showPassword);
    const handleConfirmShowClick = () => setShowConfirmPassword(!showConfirmPassword);

    const handleClick = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        handleSignup({name, email, password});
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
                    <FormControl id="name">
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<CFaUserAlt color="gray.300" />}
                            />
                            <Input type="text"
                                   onChange={(e) => setName(e.target.value)}
                                   placeholder="Name" />
                        </InputGroup>
                    </FormControl>
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
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<CFaLock color="gray.300" />}
                            />
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                            />
                            <InputRightElement>
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleShowClick}
                                >
                                    {showPassword ? <FaEyeSlash/> :<FaEye/>}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<CFaLock color="gray.300" />}
                            />
                            <Input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                            />
                            <InputRightElement>
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleConfirmShowClick}
                                >
                                    {showConfirmPassword ? <FaEyeSlash/> :<FaEye/>}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button onClick={handleClick} colorScheme="teal" size="lg">
                        Signup
                    </Button>
                    <Flex justifyContent="space-between">
                        <Link onClick={()=> navigate('/login')} color="teal.500">Already have an account?</Link>
                    </Flex>
                </Stack>
            </Box>
        </Center>
        </ChakraProvider>
    )
}

export default Signup;