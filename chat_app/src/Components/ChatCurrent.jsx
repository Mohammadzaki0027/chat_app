import axios from "axios";
import React from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
const ChatCurrent = ({ currentChat, currentuser }) => {
  const [message, setMessage] = React.useState([]);
  const getchat = async () => {
    const payload = { from: currentuser.data._id, to: currentChat._id };

    const res = await axios.post("http://localhost:8080/getmsg", payload);
    console.log(res);
    setMessage(res.data);
  };
  React.useEffect(() => {
    getchat();
  }, [currentChat]);
  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("user_auth_status"));

    const payload = {
      from: data.data._id,
      to: currentChat._id,
      message: msg,
    };
    const response = await axios.post(`http://localhost:8080/postmsg`, payload);
  };
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={""} alt="" />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {message?.map((message, index) => {
          return (
            <div key={index}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message} </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
};

export default ChatCurrent;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
 
      .content {
        max-width: 40%;
 
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;

        color: #d1d1d1;
     border:1px solid white;

        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;

      .content {
        background-color: #4f04ff21;

      }
    }
    .recieved {
      justify-content: flex-start;
   
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
