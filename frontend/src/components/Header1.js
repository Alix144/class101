import { useNavigate } from "react-router-dom";

import logo from '../images/logo1.png'

const Header1 = () => {
    const navigate = useNavigate();
    
    const navigateTo = () => {
        navigate("/auth")
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
                <button onClick={navigateTo}>Login</button>
                <button onClick={navigateTo}>Register</button>
            </div>
        </header>
     );
}
 
export default Header1;