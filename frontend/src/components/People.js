import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import axios from "axios";


import Title from "./Title";

import search from '../images/search.png'
import teacher from '../images/teacher.png'
import student from '../images/student.png'

const People = () => {
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)

    const [isStudentInfoPageOpen, setStudentInfoPage] = useState(false)
    const [query, setQuery] = useState("");
    const [query2, setQuery2] = useState("");
    const id = useParams().id;
    const userId = localStorage.userId;

    const [instructors, setInstructors] = useState([]);
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [userInfo, setUserInfo] = useState("");
    

    const kickInstructor = async(Id) => {
        const res = await axios.put(`http://localhost:4000/class/kick/instructor/${Id}`, {
            classId: id,
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleKickInstructor = (e, Id) => {
        e.preventDefault();
        kickInstructor(Id).then(()=>{
            window.location.reload()
        })
    }

    const kickStudent = async(Id) => {
        const res = await axios.put(`http://localhost:4000/class/kick/student/${Id}`, {
            classId: id,
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleKickStudent = (e, Id) => {
        e.preventDefault();
        kickStudent(Id).then(()=>{
            window.location.reload()
        })
    }

    const fetchUserDetails = async(userId) => {
        const res = await axios.get(`http://localhost:4000/user/${userId}`).catch(err=>console.log(err))
        const data = await res.data.user;
        return data;
    }

    const openInfoPage = (userId) => {
        setStudentInfoPage(!isStudentInfoPageOpen)
        setUserInfo("")
        fetchUserDetails(userId).then((data)=>setUserInfo(data))
    }

    const fetchDetails = async() => {
        const res = await axios.get(`http://localhost:4000/class/view/class/${id}`).catch(err=>console.log(err))
        const data = await res.data.class;
        return data;
    }

    useEffect(()=>{
        fetchDetails()
        .then((data)=>{
            setInstructors(data.instructors)
            setStudents(data.students)
        })
    }, [id])

    useEffect(()=>{
        console.log(instructors)
    }, [instructors])

    useEffect(()=>{
        console.log(instructors)
        console.log(students)
        console.log(name)
    }, [instructors, students, name])
    

    return ( 
        <>
        {isStudentInfoPageOpen && 
            <div className="on-page-div">   
                <div className="add-form edit-task-form" id="user-info">
                    <div className="on-page-title">
                        <h3>{userInfo.name ? userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1): ""}'s Details</h3>
                        <hr/>
                    </div>
                    <div className="student-hw-info">
                        <div className="st-info">
                            <div className="profile-pic">k</div>
                            <div>
                                <h4>{userInfo.name ? userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1): ""} {userInfo.surname ? userInfo.surname.charAt(0).toUpperCase() + userInfo.surname.slice(1): ""}</h4>
                            </div>
                        </div>
                        <h4>Email</h4>
                        <p>{userInfo.email}</p>

                        {userInfo.description &&
                        <>
                            <h4>Description</h4>
                            <p className='maxh'>{userInfo.description}</p>
                        </>
                        }
                    </div>

                    <div className="on-page-btns">
                        <button onClick={()=>setStudentInfoPage(!isStudentInfoPageOpen)}>Back</button>
                        {
                            isInstructor && userInfo._id !== userId && (
                                instructors.includes(userInfo._id) ? (
                                    <button className="danger" onClick={(e) => handleKickInstructor(e, userInfo._id)}>Kick</button>
                                ) : (
                                    <button className="danger" onClick={(e) => handleKickStudent(e, userInfo._id)}>Kick</button>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        }
        <div className="content">
            {isInstructor ?
                <Title propTitle={"Instructors"} add={"add-instructors"}/>
                :
                <Title propTitle={"Instructors"}/>
            }
            
            <div className="people-parent-div">
                <div className="ppl-search">
                    <img src={search} alt="Search" />
                    <input type="text" name="" id="" onChange={(e)=>setQuery2(e.target.value)}/>

                    <div>
                        <img src={teacher} alt="Instructor" />
                        <p>{instructors.length}</p>
                    </div>
                </div>

                <div className="people">
                    {instructors.filter(user=>user.name.toLowerCase().includes(query2)).map((user)=>(

                    <div className="one-ppl" key={user._id} onClick={()=>openInfoPage(user._id)}>
                        <div className="left-border"></div>
                        <div className="info">
                            <div className="profile-pic">{user.name[0].toUpperCase()}</div>
                            <h4>{user.name.charAt(0).toUpperCase()+user.name.slice(1)}</h4>
                        </div>
                        <p>{user.email}</p>
                    </div>

                    ))}
                </div>

                <hr className="hr"/>
            </div>

            
            {isInstructor ?
                <Title propTitle={"Students"} add={"add-student"}/>
                :
                <Title propTitle={"Students"}/>
            }
            
            <div className="people-parent-div">
                <div className="ppl-search">
                    <img src={search} alt="Search" />
                    <input type="text" name="" id="" onChange={e=>setQuery(e.target.value)}/>

                    <div>
                        <img src={student} alt="Instructor" />
                        <p>{students.length}</p>
                    </div>
                </div>

                <div className="people">
                    {students.filter(user=>user.name.toLowerCase().includes(query)).map((user)=>(

                    <div className="one-ppl" key={user._id} onClick={()=>openInfoPage(user._id)}>
                        <div className="left-border"></div>
                        <div className="info">
                            <div className="profile-pic">{user.name.charAt(0).toUpperCase()}</div>
                            <h4>{user.name.charAt(0).toUpperCase()+user.name.slice(1)}</h4>
                        </div>
                        <p>{user.email}</p>
                    </div>

                    ))}
                </div>

                <hr className="hr"/>
            </div>
        </div>
        </>
     );
}
 
export default People;