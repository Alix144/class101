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
    const [instructors, setInstructors] = useState([]);
    const [students, setStudents] = useState([]);

    const ppl = [
        {
        id: '1',
        name: 'ali',
        email: 'ali@gmail.com'
        },
        {
        id: '2',
        name: 'nagham',
        email: 'nagham@gmail.com'
        },
        {
        id: '3',
        name: 'rawan',
        email: 'rawan@gmail.com'
        },
    ]

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
        console.log(students)

    }, [instructors, students])
    

    return ( 
        <>
        {isStudentInfoPageOpen && 
            <div className="on-page-div">   
                <div className="add-form edit-task-form" >
                    <div className="on-page-title">
                        <h3>User's Details</h3>
                        <hr/>
                    </div>
                    <div className="student-hw-info">
                        <div className="st-info">
                            <div className="profile-pic">A</div>
                            <div>
                                <h4>Ali Youssef</h4>
                            </div>
                        </div>
                        <h4>Email</h4>
                        <p>ali@gmail.com</p>

                        <h4>Description</h4>
                        <p className='maxh'>Lorem i eserunt doloribus placeat odio hic eligendi in! Hic possimus rem quod. eveniet neque vitae libero quo corporis dolorem quasi.</p>
                    </div>

                    <div className="on-page-btns">
                        <button onClick={()=>setStudentInfoPage(!isStudentInfoPageOpen)}>Back</button>
                        {isInstructor &&
                        <button className="danger">Kick</button>
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
                    <input type="text" name="" id="" onChange={e=>setQuery2(e.target.value)}/>

                    <div>
                        <img src={teacher} alt="Instructor" />
                        <p>1</p>
                    </div>
                </div>

                <div className="people">
                    {instructors.filter(user=>user.name.toLowerCase().includes(query2)).map((user)=>(

                    <div className="one-ppl" key={user.id} onClick={()=>setStudentInfoPage(!isStudentInfoPageOpen)}>
                        <div className="left-border"></div>
                        <div className="info">
                            <div className="profile-pic">{user.name.charAt(0).toUpperCase()}</div>
                            <h4>{user.name}</h4>
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
                        <p>203</p>
                    </div>
                </div>

                <div className="people">
                    {students.filter(user=>user.name.toLowerCase().includes(query)).map((user)=>(

                    <div className="one-ppl" key={user.id} onClick={()=>setStudentInfoPage(!isStudentInfoPageOpen)}>
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