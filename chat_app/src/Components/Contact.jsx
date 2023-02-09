import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "styled-components";
const Contactcomp = ({ Contact, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const changeCurrentChat = (contact, index) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user_auth_status"));

    setCurrentUserName(data.data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img
              src="https://png.pngtree.com/template/20190214/ourmid/pngtree-coffee-and-tea-logo-image_54910.jpg"
              alt=""
            />
            <Text color={"white"}>Chat with Tea</Text>
          </div>
          <div className="contacts">
            {Contact?.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(contact, index)}
                >
                  <div className="avatar">
                    <img src={contact.avatarImage} alt="" />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={currentUserImage} alt="avatar" />
            </div>
            <div className="username">
              <Text color={"teal.700"} textTransform={"uppercase"} fontWeight={"extrabold"}>{currentUserName}</Text>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Contactcomp;

const Container = styles.div`
  display: grid;
  border-radius:12px;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 10px;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    background-color: #A28089;
  
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    margin-top: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    border-radius:15px;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
   
    .username {
      
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
