import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import ProfileImg from './ProfileImg'
import logo from '../images/logo1.png'
import hamburger from '../images/hamburger.png'
import plus from '../images/plus.png'
import bell from '../images/bell.png'
import logout from '../images/logout.png'

const Header2 = () => {
    const navigate = useNavigate();

    const [plusBtn, setPlusBtn] = useState(false)
    const [profileBtn, setProfileBtn] = useState(false)
    

    const plusMenu = () => {
        setPlusBtn(!plusBtn)
        setProfileBtn(false)
    }

    const profileMenu = () => {
        setProfileBtn(!profileBtn)
        setPlusBtn(false)
    }

    const goToProfile = () => {
        navigate('dashboard/profile')
        setProfileBtn(false)
    }

    return ( 
        <div className='header2'>
            <div className='header-part-1'>
                <img src={hamburger} alt="" className='hamburger'/>
                <div className="logo" onClick={()=>navigate('dashboard/home')}>
                    <img src={logo} alt="logo" />
                    <h2>Class101</h2>
                </div>
            </div>

            <div className="header-part-2">
                <img src={plus} alt="Plus" className='plus' onClick={plusMenu}/>
                <img src={bell} alt="Notification" className='bell'/>
                <div className="profile" onClick={profileMenu}>A</div>

                {plusBtn && 
                    <div className="plus-menu">
                        <div><h5>Join Class</h5></div>
                        <hr/>
                        <div><h5>Create Class</h5></div>
                    </div>
                }

                {profileBtn &&
                    <div className="profile-menu">
                        <div className='profile-menu-1'>
                            <div className="profile-img">A</div>
                            <h3>Hi, Ali</h3>
                            <p>ali@gmail.com</p>
                            <div className='profile-btn' onClick={goToProfile}>Manage</div>
                        </div>

                        <hr />

                        <div className="profile-btn"> <img src={logout} alt="" /> Signout</div>
                    </div>
                }
            </div>
        </div>
     );
}
 
export default Header2;