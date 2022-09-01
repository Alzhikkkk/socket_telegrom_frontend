import MessagePanel from "../components/messagePanel";
import Panel from "../components/panel";
import {useNavigate} from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import {BASE_URL} from '../config/baseurl';
function Main() {
    let navigate = useNavigate();
    const socket = useRef();
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() =>{
        if(!localStorage.getItem('token')){
            navigate('./login')
        } else {
            setCurrentUser(
                localStorage.getItem('user_id')
            );
          }
    }, [])
    console.log(currentUser);
    useEffect(() => {
        if (currentUser) {
          socket.current = io(`${BASE_URL}`);
          socket.current.emit("add-user", currentUser);
        }
      }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
      };
    return (
        <div className="main">
            <Panel changeChat={handleChatChange}></Panel>
            <MessagePanel currentChat={currentChat} socket={socket}></MessagePanel>
        </div>
    );
}

export default Main;