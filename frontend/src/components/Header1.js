import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setToLogin, setToRegister } from '../store/slices/loginOrRegister';

import logo from '../images/logo1.png'

const Header1 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const navigateToLogin = () => {
        navigate("/auth")
        dispatch(setToLogin())
    }

    const navigateToRegister = () => {
        navigate("/auth")
        dispatch(setToRegister())
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