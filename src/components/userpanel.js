import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { useState } from 'react';
import {connect} from 'react-redux'
import { getAllUsers, getUserById } from "../store/actions/userAction";
import unite from "../img/unite.jpg"

function UserPanel(props) {
  const[users, setUsers] = useState([]);
  const[main, setMain] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(()=>{
       props.getUsersAction({
        id:localStorage.getItem('user_id')
       }) 

       props.getUserByIdAction({
        id:localStorage.getItem('user_id')
       })
  },[localStorage.getItem('user_id')])

  useEffect(()=>{
    setUsers(props.user);
  }, [props.user])
  
  useEffect(()=>{
    setMain(props.main);
  }, [props.main])
 
  console.log(users)
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    props.changeChat(contact);
  };
    return (
      <div className="user">
         <div className="user-panel">
           {users.map((element, index)=>{
            const img = require(`../img/avatar${element.avatar}`);
            return(
              <span className="user-info" key={index} onClick={() => changeCurrentChat(index, element)}>
                  <img src={img} alt="Img"/>
                  <a>{element.full_name}</a>
              </span>
            )
           })}
           <span className="user-info user_chat" onClick={() => changeCurrentChat(4, {roomId:"room", avatar:main.avatar, full_name:main.full_name})}>
            <img src={unite}></img>
            <a>Unite of users</a>
            </span>
         </div>
      </div>
    );
  }
  


const mapDispatchToProps = dispatch => ({
    getUsersAction: bindActionCreators(getAllUsers, dispatch),
    getUserByIdAction: bindActionCreators(getUserById, dispatch)
})

const mapStateToProps = state => ({
     user: state.userReducers.online,
     main: state.userReducers.main
})

export default connect(mapStateToProps ,mapDispatchToProps)(UserPanel);