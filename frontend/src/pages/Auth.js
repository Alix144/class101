import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { login } from '../store/slices/authSlice';
import { setToLogin, setToRegister } from '../store/slices/loginOrRegister';
import { useState } from "react";

const Auth = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const isRegister = useSelector((state) => state.loginOrRegister.isRegister)
    const navigate = useNavigate();
  

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [email2, setEmail2] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [password2, setPassword2] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')



    const loginFunction = () => {
        dispatch(login())
        navigate("/dashboard/home")
    }

    const sendRequest = async() => {
        const res = await axios.post("http://localhost:4000/user/register", {
            email: email2,
            name,
            surname,
            password: password2,
        }).catch(err=>console.log(err))

        const data = await res.data;
        return data;
    }

    const handleRegister = (e) => {
        e.preventDefault()
        sendRequest().then((data)=>localStorage.setItem("userId", data.user._id)).then(()=>dispatch(login())).then(()=> navigate("/dashboard/home")).then(data=> console.log(data))
    }

    const sendRequest2 = async() => {
        const res = await axios.post("http://localhost:4000/user/login", {
            email,
            password
        }).catch(err=>console.log(err))

        const data = await res.data
        return data;
    }

    const handleLogin = (e) => {
        e.preventDefault()
        sendRequest2().then((data)=>localStorage.setItem("userId", data.user._id)).then(()=>dispatch(login())).then(()=>navigate("/dashboard/home")).then((data) => console.log(data))
    }

    return ( 
        
        <div className="authentication">

            <div className="form">
                { isRegister ? <h1>Register</h1> : <h1>Login</h1> }
                <div className="auth-select">
                    <div className={isRegister ? "" : "selected"} onClick={()=>dispatch(setToLogin())}>Login</div>
                    <div className={isRegister ? "selected" : ""} onClick={()=>dispatch(setToRegister())}>Register</div>
                </div>
                <form action="">
                    
                    {!isRegister ? 
                    <> 
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </>
                    :
                    <>
                    <input type="email" placeholder="Email" value={email2} onChange={(e)=>setEmail2(e.target.value)}/>
                    <div className="name">
                        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <input type="text" placeholder="Surname" value={surname} onChange={(e)=>setSurname(e.target.value)}/>
                    </div>
                    <input type="password" placeholder="Password" value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>

                    </>
                    }
                        
                </form>
                {isRegister ? <button className="form-btn" onClick={handleRegister}>Register</button>
                : <button className="form-btn" onClick={handleLogin}>Login</button>
                 }
                
            </div>

        </div>
     );
}
 
export default Auth;