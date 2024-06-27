import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";

import {  setToNull, setToHome, setToCalendar, setToToDo, setToClassT, setToClassS } from '../store/slices/currentSection';
import { setToInstructor, setToStudent } from '../store/slices/instructorOrStudent';
import { setToDashboard } from '../store/slices/currentClassPage';
import { setToClose } from '../store/slices/hamburger';

import home from '../images/home.png'
import calendar from '../images/calendar.png'
import todolist from '../images/to-do-list.png'
import teacher from '../images/teacher.png'
import student from '../images/student.png'
import arrow from '../images/arrow.png'

const Sidebar = () => {
    const link = "https://class101-api.onrender.com"
    const localLink = "http://localhost:4000"

    const isSidebarOpen = useSelector((state) => state.openOrClose.isOpen)
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)
    const currentSection = useSelector((state) => state.currentSection.value)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [isOpen, setOpen] = useState(false)
    const [isOpen2, setOpen2] = useState(false)

    const goToHome = () => {
        navigate("home")
        dispatch(setToHome())
        dispatch(setToClose())
        localStorage.setItem('currentSection', 'home');
    }

    const goToCalendar = () => {
        navigate("calendar")
        dispatch(setToCalendar())
        dispatch(setToClose())
        localStorage.setItem('currentSection', 'calendar');
    }

    const goToToDo = () => {
        navigate("to-do")
        dispatch(setToToDo())
        dispatch(setToClose())
        localStorage.setItem('currentSection', 'toDo');
    }

    const goToClassroom = (id) => {
        navigate(`classroom/${id}/home`)
        dispatch(setToInstructor())
        dispatch(setToDashboard())
        dispatch(setToClassT())
        dispatch(setToClose())
        localStorage.setItem('currentSection', 'classT');
    }

    const goToClassroomS = (id) => {
        navigate(`classroom/${id}/home`)
        dispatch(setToStudent())
        dispatch(setToDashboard())
        dispatch(setToClassS())
        dispatch(setToClose())
        localStorage.setItem('currentSection', 'classS');
    }

    useEffect(() => {
        const storedSection = localStorage.getItem('currentSection');
        if (storedSection) {
            dispatch(setToNull());
            if (storedSection === 'home'){
                dispatch(setToHome())
            }else if(storedSection === 'calendar'){
                dispatch(setToCalendar())
            }else if(storedSection === 'toDo'){
                dispatch(setToToDo())
            }else if(storedSection === 'classT'){
                dispatch(setToClassT())
            }else if(storedSection === 'classS'){
                dispatch(setToClassS())
            }else{
                dispatch(setToNull())
            }

        }
    }, [dispatch]);

/***********************************/

    const id = localStorage.getItem("userId");
    const [classes, setClasses] = useState();

    const sendRequest = async() => {
        const res = await axios.get(`${link}/class/view/${id}`).catch(err=>console.log(err))
        const data = await res.data.classes
        return data;
    }

    useEffect(() => {
        sendRequest().then(data=>setClasses(data))
    })

    return ( 
        <div className="sidebar" style={{ display: isSidebarOpen ? 'block' : 'none' }}>
            <div className={`sidebar-list ${currentSection === 'home' ? 'current-page' : ''}`} onClick={goToHome}>
                <img src={home} alt="Home" />
                <p>Home</p>
            </div>
            <div className={`sidebar-list ${currentSection === 'calendar' ? 'current-page' : ''}`} onClick={goToCalendar}>
                <img src={calendar} alt="Calendar" />
                <p>Calendar</p>
            </div>
            <div className={`sidebar-list ${currentSection === 'toDo' ? 'current-page' : ''}`} onClick={goToToDo}>
                <img src={todolist} alt="To-Do-List" />
                <p>To Do</p>
            </div>
            <hr />
            <div className={`sidebar-list teaching-list ${currentSection === 'classT' ? 'current-page' : ''}`} onClick={()=> setOpen(!isOpen)}>
                <img src={arrow} alt="" id='arrow' style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}/>
                <img src={teacher} alt="To-Do-List" />
                <p>Teaching</p>
            </div>

            {isOpen &&
                <div className='classes'>
                    <ul>
                        {classes && classes.map((klass, index)=>{
                            if(klass.instructors.includes(id))
                            return(
                            <div key={index} className='class-parent' onClick={()=>goToClassroom(klass._id)}>
                                <div className="profile-pic" style={{backgroundColor: klass.classColor} }>{klass.name ? klass.name[0].toUpperCase() : ""}</div>
                                <li>{klass.name}</li>
                            </div>
                            )
                        })}
                    </ul>
                </div>
            }
            <hr />

            <div className={`sidebar-list learning-list ${currentSection === 'classS' ? 'current-page' : ''}`} onClick={()=> setOpen2(!isOpen2)}>
                <img src={arrow} alt="" id='arrow' style={{ transform: isOpen2 ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}/>
                <img src={student} alt="To-Do-List" />
                <p>Learning</p>
            </div>

                {isOpen2 &&
                <div className='classes'>
                    <ul>
                        {classes && classes.map((klass, index)=>{
                            if(klass.students.includes(id)){
                            return(
                            <div key={index} className='class-parent' onClick={()=>goToClassroomS(klass._id)}>
                                <div className="profile-pic" style={{backgroundColor: klass.classColor} }>{klass.name ? klass.name[0].toUpperCase() : ""}</div>
                                <li>{klass.name}</li>
                            </div>
                            )

                            }
                        })}
                    </ul>
                </div>
                }
            <hr/>

            

        </div>
     );
}
 
export default Sidebar;