import { useSelector } from 'react-redux'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import Title from "./Title";

import doc from '../images/doc.png'
import leaf from '../images/leaf.png'
import download from '../images/download.png'

const Assignments = () => {
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)

    const classId = useParams().id

    const [isStudentHwOpen, setIsStudentHwOpen] = useState(false)
    const [assignments, setAssignments] = useState([]);

    const getAssignments = async() => {
        const res = await axios.get(`http://localhost:4000/assignment/${classId}`).catch(err=>console.log(err))
        const data = await res.data.assignments
        return data;
    }

    useEffect(() => {
        getAssignments().then(
        (data)=>{setAssignments(data) 
        console.log(data)})
    },[classId])

    const handleDate = (date) => {
        return moment(date).fromNow()
    }

    function formatDeadline(deadline) {
        if (!deadline) return "-";
    
        const formattedDeadline = moment(deadline).format('MMMM Do YYYY');
    
        return formattedDeadline;
    }

    const showFile = async(url) => {
        window.open(`http://localhost:4000/files/${url}`, "_blank", "noreferrer");
    }

    return ( 
        <>
        {isStudentHwOpen && 
            <div className="on-page-div">   
                <div className="add-form edit-task-form" >
                    <div className="on-page-title">
                        <h3>Student Assignment</h3>
                        <hr/>
                    </div>
                    <div className="student-hw-info">
                        <div className="st-info">
                            <div className="profile-pic">A</div>
                            <div>
                                <h4>Ali Youssef</h4>
                                <p>14-06-2023</p>
                            </div>
                        </div>
                        <h4>Title</h4>
                        <p>Spanish Assignment</p>

                        <h4>message</h4>
                        <p className='maxh'>Lorem ipsum dolor Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit aut alias dignissimos, magnam ex magni neque cumque perferendis voluptate deserunt doloribus placeat odio hic eligendi in! Hic possimus rem quod. eveniet neque vitae libero quo corporis dolorem quasi.</p>

                        <h4>Document</h4>
                        <button className='download no-mrgn'>Download</button>

                    </div>
                    <form action="">
                        <div>
                            <label htmlFor="grade">Grade*</label>
                            <input type="number" max={100} min={0} id="grade" name="grade"/>
                        </div>
                    </form>
                    <div className="on-page-btns">
                        <button onClick={()=>setIsStudentHwOpen(!isStudentHwOpen)}>Cancel</button>
                        <button>Send</button>
                    </div>
                </div>
            </div>
        }

        <div className="content assignments">
            {isInstructor ?
                <Title propTitle={"Assignments"} add={"addAssignment"}/>
                :
                <Title propTitle={"Assignments"}/>
            }
            

            <div className="going-assignments empty-parent">

                {false ? 
                    <>
                    <img src={leaf} alt="Empty" className='empty'/>
                    <p>No Assignment Added</p>
                    </>:
                <>

                {assignments && assignments.slice().reverse().map((assignment, index)=>{
                    return(
                    <div className="assignment">
                    <div className="info">
                        <img src={doc} alt="Document" />
                        <div>
                            <h4>{assignment.title}</h4>
                            <h6>Deadline:</h6><p>{formatDeadline(assignment.deadline)}</p>

                        </div>
                    </div>

                    <a href={assignment.url} download onClick={() => showFile(assignment.file)}>
                            <img src={download} alt="Download" />
                    </a>
                    <p className="date">{handleDate(assignment.date)}</p>
                    <div className="left-border"></div>
                    </div>

                    )

                })}
                </>
                }
                

            </div>
            
            {isInstructor ?
            <Title propTitle={"Coming Assignments"}/>
            :
            <Title propTitle={"Previous Assignments"}/>
            }
            <div className="coming-assignments empty-parent">
                {false ? 
                    <>
                        <img src={leaf} alt="Empty" className='empty'/>
                        {isInstructor ?
                        <p>No Coming Assignments</p>
                        :
                        <p>No Previous Assignments Found</p>
                        }
                    </>:
                    <>
                    {isInstructor ?
                    <div className="assignment" onClick={()=>setIsStudentHwOpen(!isStudentHwOpen)}>
                    <div className="info">
                        <div className="pic">A</div>
                        <div>
                            <h4>Ali Youssef</h4>
                            <h6>Spanish Assignment 1</h6>
                        </div>
                    </div>
                    <p className="date">01-06-2024</p>
                    <div className="left-border"></div>
                    </div>
                    :     
                    <div className="assignment">
                        <div className="info">
                            <img src={doc} alt="Document" />
                            <div>
                                <h4>Spanish Assignment 1</h4>
                            </div>
                        </div>
                        <p><b>Grade:</b> 90</p>
                        <p className="date">01-06-2024</p>
                        <div className="left-border"></div>
                    </div>
                    }
                    </>
                }
            </div>
        </div>
        </>
     );
}
 
export default Assignments;