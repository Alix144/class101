import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {authSection} from '../store/index';

import logo from '../images/logo1.png'

const Header1 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const navigateToLogin = () => {
        navigate("/auth")
        dispatch(authSection.sectionLogin())
    }

    const navigateToRegister = () => {
        navigate("/auth")
        dispatch(authSection.sectionRegister())
    }

    const navigateToMain = () => {
        navigate("/")
    }

    return ( 
        <header>
            <div className="logo" onClick={navigateToMain}>
                <img src={logo} alt="logo" />
                <h2>Class101</h2>
            </div>

            <div className="btns">
                <button onClick={navigateToLogin}>Login</button>
                <button onClick={navigateToRegister}>Register</button>
            </div>
        </header>
     );
}
 
export default Header1;