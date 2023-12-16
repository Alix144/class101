
import logo from '../images/logo1.png'
import hamburger from '../images/hamburger.png'
import plus from '../images/plus.png'
import bell from '../images/bell.png'

const Header2 = () => {

    return ( 
        <div className='header2'>
            <img src={hamburger} alt="" />
            <div className="logo">
                <img src={logo} alt="logo" />
                <h2>Class101</h2>
            </div>

            <div className="">
                <img src={plus} alt="" />
                <img src={bell} alt="" />
                <div className="profile-pic"></div>
            </div>
        </div>
     );
}
 
export default Header2;