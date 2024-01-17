import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {motion} from "framer-motion"

import {  setToNull, setToHome, setToCalendar, setToToDo, setToClassT, setToClassS } from '../store/slices/currentSection';
import { setToInstructor, setToStudent } from '../store/slices/instructorOrStudent';
import { setToDashboard } from '../store/slices/currentClassPage';

import home from '../images/home.png'
import calendar from '../images/calendar.png'
import todolist from '../images/to-do-list.png'
import teacher from '../images/teacher.png'
import student from '../images/student.png'
import arrow from '../images/arrow.png'

const Sidebar = () => {
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)
    const currentSection = useSelector((state) => state.currentSection.value)

    const dispatch = useDispatch()

    const [isOpen, setOpen] = useState(false)
    const [isOpen2, setOpen2] = useState(false)
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("home")
        dispatch(setToHome())
    }

    const goToCalendar = () => {
        navigate("calendar")
        dispatch(setToCalendar())
    }

    const goToToDo = () => {
        navigate("to-do")
        dispatch(setToToDo())
    }

    const goToClassroom = () => {
        navigate("classroom/home")
        dispatch(setToInstructor())
        dispatch(setToDashboard())
        dispatch(setToClassT())
    }

    const goToClassroomS = () => {
        navigate("classroom/home")
        dispatch(setToStudent())
        dispatch(setToDashboard())
        dispatch(setToClassS())
    }

    return ( 
        <div className="sidebar">
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
                <img src={arrow} alt="" id='arrow' style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}/>
                <img src={teacher} alt="To-Do-List" />
                <p>Teaching</p>
            </div>

            {isOpen &&
                <div className='classes'>
                    <ul>
                        <div className='class-parent'>
                            <div className="profile-pic">M</div>
                            <li>math</li>
                        </div>
                        <div className='class-parent' onClick={goToClassroom}>
                            <div className="profile-pic">S</div>
                            <li>Spanish</li>
                        </div> 
                    </ul>
                </div>
            }
            <hr />

            <div className={`sidebar-list learning-list ${currentSection === 'classS' ? 'current-page' : ''}`} onClick={()=> setOpen2(!isOpen2)}>
                <img src={arrow} alt="" id='arrow' style={{ transform: isOpen2 ? "rotate(90deg)" : "rotate(0deg)" }}/>
                <img src={student} alt="To-Do-List" />
                <p>Learning</p>
            </div>

                {isOpen2 &&
                <div className='classes'>
                    <ul>
                        <div className='class-parent' onClick={goToClassroomS}>
                            <div className="profile-pic">M</div>
                            <li>math</li>
                        </div>
                        <div className='class-parent'>
                            <div className="profile-pic">B</div>
                            <li>biology</li>
                        </div>
                        <div className='class-parent'>
                            <div className="profile-pic">S</div>
                            <li>Spanish</li>
                        </div>
                        <div className='class-parent'>
                            <div className="profile-pic">M</div>
                            <li>math</li>
                        </div>
                        <div className='class-parent'>
                            <div className="profile-pic">B</div>
                            <li>biology</li>
                        </div>
                        <div className='class-parent'>
                            <div className="profile-pic">S</div>
                            <li>Spanish</li>
                        </div>
                    </ul>
                </div>
                }
            <hr/>

            

        </div>
     );
}
 
export default Sidebar;