import { Box } from "@chakra-ui/react";
import axios from "axios";
import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";
import Contactcomp from "../Components/Contact.jsx";
import Welcome from "../Components/Welcome.jsx";
import ChatCurrent from "../Components/ChatCurrent.jsx";
const Home = () => {
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentuser, setCurrentUser] = React.useState(undefined);
  const [Contact, setContact] = React.useState([]);
  React.useEffect(() => {
    if (!localStorage.getItem("user_auth_status")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("user_auth_status")));
    }
  }, []);
  React.useEffect(() => {
    if (currentuser) {
      getuser();
    }
  }, [currentuser]);
  const getuser = async () => {
    if (currentuser.isAvatarImageSet) {
      const data = await axios.get(
        `http://localhost:8080/getavatar/${currentuser.data._id}`
      );

      setContact(data.data);
    } else {
      navigate("/avatar");
    }
  };
  const handleChatChange = (contact) => {
    setCurrentChat(contact);
  };
  return (
    <Box
      width={"100%"}
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"#131324"}
    >
      <div className="chat_container">
        <Contactcomp Contact={Contact} changeChat={handleChatChange} />
        {currentChat ? <ChatCurrent  currentChat={currentChat} currentuser={currentuser}></ChatCurrent> : <Welcome />}
      </div>
    </Box>
  );
};

export default Home;
