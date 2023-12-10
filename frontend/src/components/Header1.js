import logo from '../images/logo1.png'

const Header1 = () => {
    return ( 
        <header>
            <div className="logo">
                <img src={logo} alt="logo" />
                <h2>Class101</h2>
            </div>

            <div className="btns">
                <button>Login</button>
                <button>Register</button>
            </div>
        </header>
     );
}
 
export default Header1;