import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login, logout } from '../store/slices/authSlice';

import ProfileImg from './ProfileImg'
import logo from '../images/logo1.png'
import hamburger from '../images/hamburger.png'
import plus from '../images/plus.png'
import bell from '../images/bell.png'
import bell2 from '../images/bell2.png'
import logoutIcon from '../images/logout.png'

const Header2 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [plusBtn, setPlusBtn] = useState(false)
    const [profileBtn, setProfileBtn] = useState(false)
    const [notificationBtn, setNotificationBtn] = useState(false)
    const [isCreateClassDivOpen, setCreateClassDiv] = useState(false)
    const [isJoinClassDivOpen, setJoinClassDiv] = useState(false)

    const plusMenu = () => {
        setPlusBtn(!plusBtn)
        setProfileBtn(false)
        setNotificationBtn(false)
    }

    const notificationMenu = () => {
        setNotificationBtn(!notificationBtn)
        setProfileBtn(false)
        setPlusBtn(false)
    }

    const profileMenu = () => {
        setProfileBtn(!profileBtn)
        setPlusBtn(false)
        setNotificationBtn(false)
    }

    const goToProfile = () => {
        navigate('dashboard/profile')
        setProfileBtn(false)
    }

    const closeCreateClassDiv = () => {
        setCreateClassDiv(false)
        setPlusBtn(false)
    }

    const closeJoinClassDiv = () => {
        setJoinClassDiv(false)
        setPlusBtn(false)
    }

    const logoutFunction = () => {
        dispatch(logout())
        navigate("/auth")
    }

    return ( 

        <>
        {isCreateClassDivOpen && 
            <div className="on-page-div">
                <div className="add-form">
                    <div className="on-page-title">
                        <h3>Create Class</h3>
                        <hr />
                    </div>
                    <form action="">
                        <div>
                            <p>Name*</p>
                            <input type="text"/>
                        </div>
                        <div>
                            <label htmlFor="code">Course Code</label>
                            <input type="text" id="code" name="code"/>
                        </div>
                        <div>
                            <label htmlFor="desc">Description</label>
                            <textarea name="desc" id="desc"  rows="5"></textarea>
                        </div>
                        <div>
                            <label htmlFor="max">Max Students</label>
                            <input type="number" min={1} className='type-number' name="max" id="max"/>
                        </div>
                        <div>
                        <p>Class Color</p>
                            <div className="colors">
                                <div style={{backgroundColor: "#74BCFF"}}></div>
                                <div style={{backgroundColor: "#86FFAF"}}></div>
                                <div style={{backgroundColor: "#B63EFF"}}></div>
                                <div style={{backgroundColor: "#FF6464"}}></div>
                                <div style={{backgroundColor: "#FFD15A"}}></div>
                            </div>
                        </div>
                    </form>
                    <div className="on-page-btns">
                        <button onClick={closeCreateClassDiv}>close</button>
                        <button>Create</button>
                    </div>
                </div>
            </div>
        }

        {isJoinClassDivOpen && 
            <div className="on-page-div">
                <div className="add-form" style={{marginTop: "0"}}>
                    <div className="on-page-title">
                        <h3>Join Class</h3>
                        <hr />
                    </div>
                    <form action="">
                        <div>
                            <label htmlFor="code">Class Code</label>
                            <input type="text"/>
                        </div>
                    </form>

                    <div className="on-page-btns">
                        <button onClick={closeJoinClassDiv}>close</button>
                        <button>join</button>
                    </div>
                </div>
            </div>
        }
        
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
                <img src={bell} alt="Notification" className='bell' onClick={notificationMenu}/>
                <div className="profile" onClick={profileMenu}>A</div>

                {plusBtn && 
                    <div className="plus-menu">
                        <div onClick={()=> setJoinClassDiv(true)}><h5>Join Class</h5></div>
                        <hr/>
                        <div onClick={()=> setCreateClassDiv(true)}><h5>Create Class</h5></div>
                    </div>
                }

                {notificationBtn &&
                    <div className="notification-menu">
                        <div className="notification-menu-header">
                            <img src={bell2} alt="Bell" />
                            <h4>Notifications</h4>
                        </div>
                        <div className="notifications">
                            <div className="notification">
                                <div className="notification-profile-pic">S</div>
                                <div className="notification-info">
                                    <p><b>Sara</b> Invited you to <b>Spanish101</b></p>
                                    <p className='notification-date'>4 October</p>
                                </div>
                            </div>
                            <div className="notification">
                                <div className="notification-profile-pic">S</div>
                                <div className="notification-info">
                                    <p><b>Sara</b> Invited you to <b>Spanish101</b></p>
                                    <p className='notification-date'>4 October</p>
                                </div>
                            </div>
                            <div className="notification">
                                <div className="notification-profile-pic">S</div>
                                <div className="notification-info">
                                    <p><b>Sara</b> Invited you to <b>Spanish101</b></p>
                                    <p className='notification-date'>4 October</p>
                                </div>
                            </div>
                        </div>
                        <button>View All</button>
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

                        <div className="profile-btn" onClick={logoutFunction}> <img src={logoutIcon} alt="logout-icon" /> Signout</div>
                    </div>
                }
            </div>
        </div>
        
        </>

     );
}
 
export default Header2;