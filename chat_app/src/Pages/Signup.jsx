import {

  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const toast = useToast()
  const navigate=useNavigate()
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const handelclick = () => {

    axios
      .post(`http://localhost:8080/signup`, user)
      .then((r) => {
    if(r.status===200){
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 6000,
        isClosable: true,
      })
      navigate("/login")
    }
      })
      .catch((err) => {
        toast({
          title: 'Something went wrong',
          description: "use different email/username",
          status: 'error',
          duration: 6000,
          isClosable: true,
        })
      });
  };
  const handelchange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  React.useEffect(() => {
    let data=localStorage.getItem("user_auth_status")
    
    if(data){
      navigate("/")
    }
  }, []);
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign up</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Username"
                name="username"
                value={user.username}
                onChange={handelchange}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="email"
                name="email"
                value={user.email}
                onChange={handelchange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="password"
                name="password"
                value={user.password}
                onChange={handelchange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handelclick}
              >
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
