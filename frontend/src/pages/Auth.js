
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login, logout } from '../store/slices/authSlice';

const Auth = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const loginFunction = () => {
        dispatch(login())
        navigate("/dashboard/home")
    }

    return ( 
        
        <div className="authentication">

            <div className="form">
                { true ? <h1>Login</h1>: <h1>Register</h1> }
                <div className="auth-select">
                    <div className={true ? "selected" : ""} >Login</div>
                    <div className={false === false ? "selected" : ""} >Register</div>
                </div>
                <form action="">
                    
                    {true ? 
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
                {true ? <button className="form-btn" onClick={loginFunction}>Login</button>
                : <button className="form-btn">Register</button>
                 }
                
            </div>

        </div>
     );
}
 
export default Auth;