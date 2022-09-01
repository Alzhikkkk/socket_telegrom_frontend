import { bindActionCreators } from "redux";
import { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import { login } from "../store/actions/loginAction";
import { useNavigate } from "react-router-dom";

function Login(props){
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onFinish = () => {
     props.loginAdminAction({email: email,password:password});
    };

    // const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
    // };

    const onChangeEmail = e => {
    setEmail(e.target.value)
    }

    const onChangePassword = e => {
    setPassword(e.target.value)
    }

    useEffect(() => {
    if(localStorage.getItem('token')){
        navigate("/");
    }
    }, [localStorage.getItem('token')])

    return (
        <section className="container page">
		<div className="auth-form">
            <h1>Вход</h1>
			
                <fieldset className="fieldset">
                    <input className="input" type="text" name="email" placeholder="Введите email" onChange={onChangeEmail}/>
                </fieldset>
                <fieldset className="fieldset">
                    <input className="input" type="password" name="password" placeholder="Введите пароль" onChange={onChangePassword}/>
                </fieldset>

                <fieldset className="fieldset">
                    <button className="button" type="submit" onClick={onFinish}>Войти</button>
                </fieldset>

            <p>If you don't have an account, you can <a href="./registration">sign up</a>!</p>
		</div>
	    </section>
        )
}


const mapDispatchToProps = dispatch => ({
    loginAdminAction: bindActionCreators(login, dispatch),
})

const mapStateToProps = state => ({
    token: state.loginAdminReducers.token
})

export default connect(mapStateToProps ,mapDispatchToProps)(Login);