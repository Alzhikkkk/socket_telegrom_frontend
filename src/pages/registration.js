
import { bindActionCreators } from "redux";
import { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import { createUser } from "../store/actions/registerAction";
import { useNavigate } from "react-router-dom";


function Register(children){
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [full_name, setFullName] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [img, setImg] = useState(null);

    const onChangeEmail = value => {
        console.log(value.target.value);
        setEmail(value.target.value)
    }

    const onChangeFullName = value => {
        setFullName(value.target.value)
    }

    const onChangeNickname = value => {
        setNickname(value.target.value)
    }

    const onChangePassword = value => {
        setPassword(value.target.value)
    }

    const onChangePassword1 = value => {
        setPassword1(value.target.value)
    }

    const onChangeImg = value => {
		console.log(value.target.files[0])
        setImg(value.target.files[0])
    }

    const handleOk = () => {
        children.createUserAction({
            email: email,
            full_name: full_name,
            nickname: nickname,
            password: password,
            password1:password1,
            avatar:img
        })
        navigate('/login') 
    }

    // useEffect(() => {
    //     if(!children.loading) {
    //         setEmail("")
    //         setFullName("")
    //         setNickname("")
    //         setPassword("")
    //         setPassword1("")
    //         // setImg(null)
    //     } 
    // }, [children.loading])

    return (
        <section className="container page">
            <div className="auth-form">
                <h1>Регистрация</h1>
                {/* <form className="form" action="" method="POST"> */}
                    <fieldset className="fieldset">
                        <input className="input"  type="text" name="email" placeholder="Введите email" onChange={onChangeEmail}/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <input className="input" type="text"   name="full_name" placeholder="Полное имя" onChange={onChangeFullName}/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <input className="input" type="text"  name="nickname" placeholder="Nickname" onChange={onChangeNickname}/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <input className="input" type="password"   name="password" placeholder="Введите пароль" onChange={onChangePassword}/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <input className="input" type="password"   name="password1" placeholder="Подтвердить пароль" onChange={onChangePassword1}/>
                    </fieldset>

                    <fieldset className="fieldset">
                        <button className="button button-yellow input-file">
                            <input type="file" name="avatar" onChange={onChangeImg}/>	
                            Выберите картинку
                        </button>
                    </fieldset>

                    <fieldset className="fieldset">
                        <button className="button" type="submit" onClick={handleOk}>Зарегистрироваться</button>
                    </fieldset>
                {/* </form> */}
            </div>
	    </section>
    )
}


const mapDispatchToProps = dispatch => ({
    createUserAction: bindActionCreators(createUser, dispatch),
})

const mapStateToProps = state => ({
    loading: state.RegisterReducers.isLoading,
})

export default  connect(mapStateToProps, mapDispatchToProps)(Register)