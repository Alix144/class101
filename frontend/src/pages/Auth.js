import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from '../store/slices/authSlice';
import { setToLogin, setToRegister } from '../store/slices/loginOrRegister';
import { useState } from "react";

const Auth = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const isRegister = useSelector((state) => state.loginOrRegister.isRegister)
    const navigate = useNavigate();

    const loginFunction = () => {
        dispatch(login())
        navigate("/dashboard/home")
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
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    </>
                    :
                    <>
                    <input type="email" placeholder="Email"/>
                    <div className="name">
                        <input type="text" placeholder="Name"/>
                        <input type="text" placeholder="Surname"/>
                    </div>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm Password"/>

                    </>
                    }
                        
                </form>
                {isRegister ? <button className="form-btn">Register</button>
                : <button className="form-btn" onClick={loginFunction}>Login</button>
                 }
                
            </div>

        </div>
     );
}
 
export default Auth;