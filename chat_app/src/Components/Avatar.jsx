import { Box, Heading, Img, Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";


const Avatar = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([
    {
      img_url:
        "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png",
    },
    {
      img_url:
        "https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_960_720.png",
    },
    {
      img_url:
        "https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635451_960_720.png",
    },
    {
      img_url:
        "https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635449__340.png",
    },
  ]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const handelselect = async () => {
    if (selectedAvatar === undefined) {
      toast({
        title: "Something went wrong",
        description: "first select the avatar",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      const user = await JSON.parse(localStorage.getItem("user_auth_status"));

      let { data } = await axios.post(
        `http://localhost:8080/setavatar/${user.data._id}`,
        {
          image: avatars[selectedAvatar],
        }
      );

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;

        localStorage.setItem("user_auth_status", JSON.stringify(user));
        navigate("/");
      } else {
        toast({
          title: "Something went wrong",
          description: "first select the avatar",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      }
    }
  };
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
        width={"100vw"}
        border={"2px dotted red"}
        backgroundImage={"linear-gradient(to right, #DECBA4, #3E5151)"}
      >
        <Box mt={"50px"}>
          <Heading color={"white"} size={"lg"}>
            Pick an Avatar as your profile picture
          </Heading>
        </Box>
        <Box
          width={["100%", "100%", "100%", "75%"]}
          margin={"auto"}
          height={["auto", "auto", "auto", "300px"]}
          border={"0.5rem dotted green"}
          display={"flex"}
          alignContent={"center"}
          justifyContent={"space-evenly"}
          flexDirection={["column", "column", "column", "row"]}
        >
          {avatars?.map((item, index) => {
            return (
              <Box
                border={` ${
                  selectedAvatar === index ? "2px solid red" : "2px solid blue"
                }`}
                w={"200px"}
                key={index}
                height={["100px", "100px", "100px", "200px"]}
              >
                <Img
                  w={"100px"}
                  height={["50px", "50px", "100px"]}
                  margin={"auto"}
                  mt={"50px"}
                  src={""}
                  onClick={() => {
                    setSelectedAvatar(index);
                  }}
                />
              </Box>
            );
          })}
          <Button onClick={handelselect} colorScheme={"twitter"} mt={"80px"}>
            Pick the Avatar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Avatar;
