import telegram from "../img/telegram.svg";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { useState, useRef, useEffect } from 'react';
import {connect} from 'react-redux'
import { v4 as uuidv4 } from "uuid";
import { addMessage, getMessages, getMessagesByRoom } from "../store/actions/messageAction";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { getUserById } from "../store/actions/userAction";

const Button = styled.button`
      display:flex;
      width:50px;
      border-radius:100%;
      background-color: #fff;
      align-items:center;
      justify-content: center;
      border:none;

      img{
        width:20px;
        height:20px;
      }
`;


function MessagePanel(props) {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState({});
  const[main, setMain] = useState([]);
  
 
  console.log(props.currentChat)
  useEffect( () => {
    props.currentChat && props.currentChat.id?
     props.getMessageAction({
        from: localStorage.getItem('user_id'),
        to: props.currentChat ? props.currentChat.id : 0
    })
    :
    props.getMessageByRoomAction({
      from: localStorage.getItem('user_id'),
      roomId: props.currentChat ? props.currentChat.roomId : ""
    })
    // setMessages(props.message);
  }, [props.currentChat]);

  useEffect(()=>{
    if(props.currentChat && props.currentChat.id){
        props.getUserByIdAction({
          id:localStorage.getItem('user_id')
        })
    }
    },[props.currentChat])

    useEffect(()=>{
    setMain(props.main);
    }, [props.main])

  useEffect(() => {
    setMessages(props.message);
  }, [props.message])
  console.log(messages);

  const handleSendMsg = async (msg) => {
    props.socket.current.emit("send-msg", {
      to: props.currentChat.id,
      from: localStorage.getItem("user_id"),
      msg,
      avatar:main.avatar,
      full_name:main.full_name
    });

    
    
    props.addMessageAction(
      props.currentChat && props.currentChat.id ?
      {
      from:localStorage.getItem('user_id'),
      to:props.currentChat.id,
      message:msg,
    }:
    {
      from:localStorage.getItem('user_id'),
      roomId:props.currentChat.roomId,
      message:msg,
    }
    )

  
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg, avatar: main.avatar, full_name:main.full_name});
    setMessages(msgs);
   }

   const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  console.log(props.socket.current);
   useEffect(() => {
    if (props.socket.current) {
      props.socket.current.on("msg-recieve", (msg, avatar, full_name) => {
        // if(full_name === props.currentChat.full_name || props.currentChat.roomId){
          setArrivalMessage({ fromSelf: false, message: msg, avatar:avatar, full_name:full_name });
        
      });
    }
    }, [props.socket.current]);

    useEffect(() => {
      if(props.currentChat && arrivalMessage && arrivalMessage.full_name === props.currentChat.full_name || props.currentChat && props.currentChat.roomId && arrivalMessage.full_name){
            arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
      }
    }, [arrivalMessage]);

    console.log(arrivalMessage);
  
    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    console.log(main);
    return (
      <div className="message">
        { props.currentChat && props.currentChat.id ? 
        <div className="message-header">
          <img src={require(`../img/avatar${props.currentChat.avatar}`)}/>
          <h3>{props.currentChat.full_name}</h3>
        </div>
        :
        <div className="message-header"></div>
        }
           <div className="message-place">
                  {
                  Array.isArray(messages) ?
                  messages.map((message) => {
                    let img = ""
                    if(message.avatar){
                        img = require(`../img/avatar${message.avatar}`);
                     }
                  return (
                    <div className={`${
                      message.fromSelf ? "sended_mes" : "recieved_mes"
                    }`} ref={scrollRef} key={uuidv4()}>
                       <img src={img} alt="Photo" className="photo"/>
                      <div
                        className={`messages ${
                          message.fromSelf ? "sended" : "recieved"
                        }`}
                      >
                       
                        <div className="content">
                          <h3>{message.full_name}</h3>
                          <p>{message.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
                :
                <p>No messages yet</p>
              }
           </div>

           <div className="message-panel">
           <div className="message-sender">
               <input placeholder="Message" onChange={(e) => setMsg(e.target.value)}
                value={msg} />
           </div>
           <Button type="submit" onClick={(event) => sendChat(event)}><img src={telegram} alt="Telegram"/></Button>
           </div>
      </div>
    );
  }


const mapDispatchToProps = dispatch => ({
  addMessageAction: bindActionCreators(addMessage, dispatch),
  getMessageAction: bindActionCreators(getMessages, dispatch),
  getMessageByRoomAction: bindActionCreators(getMessagesByRoom, dispatch),
  getUserByIdAction: bindActionCreators(getUserById, dispatch)
})

const mapStateToProps = state => ({
   message: state.messagesReducers.messages,
   main: state.userReducers.main
})

export default connect(mapStateToProps ,mapDispatchToProps)(MessagePanel);

