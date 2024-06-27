import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import moment from "moment";

import { login, logout } from '../store/slices/authSlice';
import { setToOpen, setToClose } from '../store/slices/hamburger';
import { setToInstructor, setToStudent } from '../store/slices/instructorOrStudent';

import ProfileImg from './ProfileImg'
import logo from '../images/logo1.png'
import hamburger from '../images/hamburger.png'
import plus from '../images/plus.png'
import bell from '../images/bell.png'
import bell2 from '../images/bell2.png'
import bell3 from '../images/bell3.png'
import logoutIcon from '../images/logout.png'
import emptyBox from '../images/empty-box.png'
import check from '../images/check.png'

const Header2 = () => {
    const link = "https://class101-api.onrender.com"
    const localLink = "http://localhost:4000"

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const isSidebarOpen = useSelector((state) => state.openOrClose.isOpen)

    const userId = localStorage.getItem("userId");

    const [user, setUser] = useState(null)
    const [color, setColor] = useState("#74BCFF")

    const [plusBtn, setPlusBtn] = useState(false)
    const [profileBtn, setProfileBtn] = useState(false)
    const [notificationBtn, setNotificationBtn] = useState(false)
    const [isCreateClassDivOpen, setCreateClassDiv] = useState(false)
    const [isJoinClassDivOpen, setJoinClassDiv] = useState(false)

    const [selectedColor, setSelectedColor] = useState("#74BCFF");

    const [name, setName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [invitations, setInvitations] = useState([]);

    const [invitationCode, setInvitationCode] = useState("");

    const [error, setError] = useState("")

    const handleDate = (date) => {
        return moment(date).fromNow()
    }

    const handleColorClick = (color) => {
        setSelectedColor(color)
    }

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
        setError("")
    }

    const closeJoinClassDiv = () => {
        setJoinClassDiv(false)
        setPlusBtn(false)
        setError("")
    }

    const logoutFunction = () => {
        dispatch(logout())
        localStorage.clear();
        navigate("/auth")
    }

    const goToNotifications = () => {
        navigate("dashboard/notifications")
        setNotificationBtn(false)
    }

    /*******************/

    function generateRandomCode(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          code += characters.charAt(randomIndex);
        }
      
        return code;
    }

    // create class
    
    const createClass = async() => {
        const res = await axios.post(`${link}/class/create`, {
            name,
            courseCode,
            invitationCode: generateRandomCode(6),
            description,
            visibility,
            classColor: selectedColor,
            user: localStorage.getItem('userId')
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleCreateClass = (e) => {
        e.preventDefault()
        if(name === ""){
            setError("Please Fill in the required fields!")
        }else{
            setError("")
            createClass().then((data) => {
                navigate(`dashboard/classroom/${data.class._id}/home`);
                dispatch(setToInstructor())
                window.location.reload();
            });
            
        }
    }


    // join class
    const joinClass = async() => {
        const res = await axios.put(`${link}/class/join/${userId}`, {
            invitationCode,
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleJoinClass = (e) => {
        e.preventDefault()
        if(invitationCode === ""){
            setError("Please provide the class invitation code!")
        }else{
            setError("")
            joinClass().then((data) => {
                navigate(`dashboard/classroom/${data.existingClass._id}/home`);
                dispatch(setToStudent())
                window.location.reload();
            });
            
        }
    }

    // fetch user name
    const fetchDetails = async() => {
        const res = await axios.get(`${link}/user/${userId}`).catch(err=>console.log(err))
        const data = await res.data.user;
        return data;
    }

    useEffect(()=>{ 
        fetchDetails()
        .then((data)=>{
            setUser(data)
            setColor(data.color)
        })
    },[userId])


    // fetch invitations
    const getInvitations = async() => {
        const res = await axios.get(`${link}/invite/get/${userId}`).catch(err=>console.log(err))
        const data = await res.data.invitations;
        return data;
    }

    useEffect(()=>{ 
        getInvitations()
        .then((data)=>{
            setInvitations(data)
        })
    },[])

    const toggleSidebar = () => {
        if(isSidebarOpen){
            dispatch(setToClose())
        }else{
            dispatch(setToOpen())
        }
    }

    return ( 

        <>
        {isCreateClassDivOpen && 
            <div className="on-page-div">
                <div className="add-form colors-form">
                    <div className="on-page-title">
                        <h3>Create Class</h3>
                        <hr />
                    </div>
                    <form action="">
                        <div>
                            <label htmlFor="name">Name*</label>
                            <input type="text" id='name' name='name' value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="code">Course Code</label>
                            <input type="text" id="code" name="code" value={courseCode} onChange={(e)=>setCourseCode(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="desc">Description</label>
                            <textarea name="desc" id="desc"  rows="5" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label htmlFor="visibility">Visibility</label>
                            <select id="visibility" name="visibility" value={visibility} onChange={(e)=>setVisibility(e.target.value)}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                        <div>
                        <p>Class Color</p>
                            <div className="colors">
                                <div className="colors-container">
                                    <div className='circle-color' style={{backgroundColor: "#74BCFF"}} onClick={()=>handleColorClick("#74BCFF")}> {selectedColor ==="#74BCFF" && <img src={check} alt="check"/>} </div>
                                    <div className='circle-color' style={{backgroundColor: "#86FFAF"}} onClick={()=>handleColorClick("#86FFAF")}> {selectedColor ==="#86FFAF" && <img src={check} alt="check"/>} </div>
                                    <div className='circle-color' style={{backgroundColor: "#B63EFF"}} onClick={()=>handleColorClick("#B63EFF")}> {selectedColor ==="#B63EFF" && <img src={check} alt="check"/>} </div>
                                    <div className='circle-color' style={{backgroundColor: "#FF6464"}} onClick={()=>handleColorClick("#FF6464")}> {selectedColor ==="#FF6464" && <img src={check} alt="check"/>} </div>
                                    <div className='circle-color' style={{backgroundColor: "#FFD15A"}} onClick={()=>handleColorClick("#FFD15A")}> {selectedColor ==="#FFD15A" && <img src={check} alt="check"/>} </div>
                                </div>
                            </div>
                        </div>
                        {error && <p className='error'>{error}</p>}

                    </form>
                    <div className="on-page-btns">
                        <button onClick={closeCreateClassDiv}>close</button>
                        <button onClick={handleCreateClass}>Create</button>
                    </div>
                </div>
            </div>
        }

        {isJoinClassDivOpen && 
            <div className="on-page-div">
                <div className="add-form" id="add-form-join-class" style={{marginTop: "0"}}>
                    <div className="on-page-title">
                        <h3>Join Class</h3>
                        <hr />
                    </div>
                    <form action="">
                        <div>
                            <label htmlFor="code">Class Code</label>
                            <input type="text" value={invitationCode} onChange={(e)=>setInvitationCode(e.target.value)}/>
                        </div>

                        {error && <p className='error'>{error}</p>}

                    </form>

                    <div className="on-page-btns">
                        <button onClick={closeJoinClassDiv}>close</button>
                        <button onClick={handleJoinClass}>join</button>
                    </div>
                </div>
            </div>
        }
        
        <div className='header2'>
            <div className='header-part-1'>
                <img src={hamburger} alt="" className='hamburger' onClick={toggleSidebar}/>
                <div className="logo" onClick={()=>navigate('dashboard/home')}>
                    <img src={logo} alt="logo" />
                    <h2>Class101</h2>
                </div>
            </div>

            <div className="header-part-2">
                <img src={plus} alt="Plus" className='plus' onClick={plusMenu}/>
                <img src={invitations.length !== 0 ? bell3 : bell} alt="Notification" className='bell' onClick={notificationMenu}/>
                <div className="profile" style={{backgroundColor: `${color}`}} onClick={profileMenu}>{user && user.name[0].toUpperCase()}</div>

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

                            {invitations.length !== 0 ? (
                                invitations.slice().reverse().map((invitation, index) => (
                                    
                                        <div className="notification" onClick={goToNotifications} key={invitation._id}>
                                            <div className="notification-profile-pic" style={{backgroundColor: `${invitation.color}`}}>
                                                {invitation.from.name && invitation.from.name[0].toUpperCase()}
                                            </div>
                                            <div className="notification-info">
                                                <p> <b>{invitation.from.name} {invitation.from.surname}</b> invited you to <b>{invitation.class.name}</b>{invitation.asInstructor ? " to be an instructor": ""}.</p>
                                                <p className="notification-date">{handleDate(invitation.date)}</p>
                                            </div>
                                        </div>
                                    
                                ))
                                ) : (
                                    
                                    <div className="no-notification">
                                        <img src={emptyBox} alt="Empty-box"/>
                                        <p>No notifications</p>
                                    </div>
                                    
                            )}
                    
                        </div>
                        
                    </div>
                }

                {profileBtn &&
                    <div className="profile-menu">
                        <div className='profile-menu-1'>
                            <div className="profile-img" style={{backgroundColor: `${color}`}}>{user && user.name[0].toUpperCase()}</div>
                            <h3>Hi, {user && user.name}</h3>
                            <p>{user && user.email}</p>
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