import {authSection} from '../store/index';
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
    const section = useSelector(state => state.section);
    const dispatch = useDispatch();

    const changeStateToLogin = () => {
        dispatch(authSection.sectionLogin());
    }

    const changeStateToRegister = () => {
        dispatch(authSection.sectionRegister());
    }

    return ( 
        
        <div className="authentication">

            <div className="form">
                {section === true ? <h1>Login</h1>: <h1>Register</h1> }
                <div className="auth-select">
                    <div className={section ? "selected" : ""} onClick={changeStateToLogin}>Login</div>
                    <div className={section === false ? "selected" : ""} onClick={changeStateToRegister}>Register</div>
                </div>
                <form action="">
                    
                    {section ? 
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
                {section ? <button className="form-btn">Login</button>
                : <button className="form-btn">Register</button>
                 }
                
            </div>

        </div>
     );
}
 
export default Auth;