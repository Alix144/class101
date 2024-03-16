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
    const userId = localStorage.getItem("userId");

    const [isStudentHwOpen, setIsStudentHwOpen] = useState(false)
    const [isHwDetailsOpen, setIsHwDetailsOpen] = useState(false)
    const [isSendHwOpen, setIsSendHwOpen] = useState(false)
    const [assignments, setAssignments] = useState([]);
    const [assignment, setAssignment] = useState("");
    const [submittedHws, setSubmittedHws] = useState([]);
    const [studentSubmittedHws, setStudentSubmittedHws] = useState([]);
    const [studentSubmittedHw, setStudentSubmittedHw] = useState("");
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState("")

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

    const getSubmittedHws = async() => {
        const res = await axios.get(`http://localhost:4000/submitted/${classId}`).catch(err=>console.log(err))
        const data = await res.data.submittedHws
        return data;
    }

    useEffect(() => {
        getSubmittedHws().then(
        (data)=>{setSubmittedHws(data) 
        console.log(data)})
    },[classId])

    const getStudentSubmittedHws = async() => {
        const res = await axios.get(`http://localhost:4000/submitted/user/${userId}`).catch(err=>console.log(err))
        const data = await res.data.submittedHws
        return data;
    }

    useEffect(() => {
        getStudentSubmittedHws().then(
        (data)=>{setStudentSubmittedHws(data) 
        console.log(data)})
    },[classId])

    const handleDate = (date) => {
        return moment(date).fromNow()
    }

    const handleSendHwBtn = () =>{
        setIsHwDetailsOpen(!isHwDetailsOpen)
        setIsSendHwOpen(!isSendHwOpen)
    }

    const handleFileChange = (event) => {
        const fileInput = event.target;
        if (fileInput.files.length > 0) {
          setFileName(fileInput.files[0].name);
          setFile(event.target.files[0])
        } else {
          setFileName('Upload');
        }
      }

    function formatDeadline(deadline) {
        if (!deadline) return "-";
    
        const formattedDeadline = moment(deadline).format('MMMM Do YYYY');
    
        return formattedDeadline;
    }

    const showFile = async(url) => {
        window.open(`http://localhost:4000/files/${url}`, "_blank", "noreferrer");
    }

    const fetchAssignmentDetails = async(assignmentId) => {
        const res = await axios.get(`http://localhost:4000/assignment/details/${assignmentId}`).catch(err=>console.log(err))
        const data = await res.data.assignment;
        return data;
    }

    const openHwDetails = (assignmentId) => {
        setIsHwDetailsOpen(!isHwDetailsOpen)
        setAssignment("")
        fetchAssignmentDetails(assignmentId).then((data)=>setAssignment(data))
    }

    const fetchSubmittedHwDetails = async(assignmentId) => {
        const res = await axios.get(`http://localhost:4000/submitted/details/${assignmentId}`).catch(err=>console.log(err))
        const data = await res.data.submittedHw;
        return data;
    }

    const openSubmittedHwDetails = (assignmentId) => {
        setIsStudentHwOpen(!isStudentHwOpen)
        setStudentSubmittedHw("")
        fetchSubmittedHwDetails(assignmentId).then((data)=>setStudentSubmittedHw(data))
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
                                <h4>{studentSubmittedHw && studentSubmittedHw.user.name} {studentSubmittedHw && studentSubmittedHw.user.surname}</h4>
                                <p>{studentSubmittedHw && handleDate(studentSubmittedHw.assignment.date)}</p>
                            </div>
                        </div>
                        <h4>Title</h4>
                        <p>{studentSubmittedHw && studentSubmittedHw.assignment.title}</p>

                        <h4>message</h4>
                        <p className='maxh'>{studentSubmittedHw && studentSubmittedHw.message}</p>

                        <h4>Document</h4>
                        <a href={assignment.url} download onClick={() => showFile(studentSubmittedHw.file)}>
                            <button className='download no-mrgn'>Download</button>    
                        </a>

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
        
        {isHwDetailsOpen && 
            <div className="on-page-div">   
                <div className="add-form edit-task-form" >
                    <div className="on-page-title">
                        <h3>Assignment Details</h3>
                        <hr/>
                    </div>
                    <div className="student-hw-info">
 
                        <h4>Title</h4>
                        <p>{assignment.title}</p>

                        <h4>Date</h4>
                        <p>{handleDate(assignment.date)}</p>

                        <h4>Deadline</h4>
                        <p>{formatDeadline(assignment.deadline)}</p>

                        <h4>Discription</h4>
                        <p className='maxh'>{assignment.description}</p>

                        <h4>Document</h4>
                        <a href={assignment.url} download onClick={() => showFile(assignment.file)}>
                            <button className='download no-mrgn'>Download</button>    
                        </a>

                    </div>
                    {!isInstructor &&
                    <button className='download no-mrgn center-btn' onClick={handleSendHwBtn}>Send Assignment</button>
                    }
                    <div className="on-page-btns">
                        <button onClick={()=>setIsHwDetailsOpen(!isHwDetailsOpen)}>Cancel</button>
                    </div>
                </div>
            </div>
        }

        {isSendHwOpen && 
            <div className="on-page-div">   
                <div className="add-form edit-task-form" >
                    <div className="on-page-title">
                        <h3>Send Assignment</h3>
                        <hr/>
                    </div>
                    <div className="student-hw-info">
 
                        <h4>Title</h4>
                        <p>Spanish Assignment</p>
                        <form action="" className='hwForm'>
                            <h4>Message</h4>
                            <textarea name="" id="" cols="30" rows="5"></textarea>
                            
                            <label htmlFor="file" className='label'>Document</label>
                            <label htmlFor="file" className='upload no-mrgn'>Upload</label>
                            <input type="file" id="file" onChange={handleFileChange}/>
                            <p>{fileName}</p>
                        </form>



                    </div>
                    
                    <div className="on-page-btns">
                        <button onClick={handleSendHwBtn}>back</button>
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
            
            {/****** going assignments *******/}

            <div className="going-assignments empty-parent">
                {false ? 
                    <>
                    <img src={leaf} alt="Empty" className='empty'/>
                    <p>No Assignment Added</p>
                    </>:
                <>

                {assignments && assignments.slice().reverse().map((assignment, index)=>{
                    return(
                    <div className="assignment" onClick={()=>openHwDetails(assignment._id)} key={index}>
                        <div className="info">
                            <img src={doc} alt="Document" />
                            <div>
                                <h4>{assignment.title}</h4>
                                <h6>Deadline:</h6><p>{formatDeadline(assignment.deadline)}</p>
                            </div>
                        </div>

                        <a href={assignment.url} download onClick={() => showFile(assignment.file)} className='download-img'>
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
            
            {/****** coming assignments *******/}

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
                    (submittedHws && submittedHws.slice().reverse().map((assignment, index)=>{
                        return(
                            <div className="assignment" onClick={()=>openSubmittedHwDetails(assignment._id)} key={index}>
                                <div className="info">
                                    <div className="pic">{assignment.user.name[0].toUpperCase()}</div>
                                    <div>
                                        <h4>{assignment.user.name} {assignment.user.surname}</h4>
                                        <h6>{assignment.assignment.title}</h6>
                                    </div>
                                </div>
                                <p className="date">{handleDate(assignment.date)}</p>
                                <div className="left-border"></div>
                            </div>
                        )
    
                    }))
                    :     
                    (studentSubmittedHws && studentSubmittedHws.slice().reverse().map((assignment, index)=>{
                        return(
                            <div className="assignment">
                                <div className="info">
                                    <img src={doc} alt="Document" />
                                    <div>
                                        <h4>{assignment.assignment.title}</h4>
                                    </div>
                                </div>
                                {assignment.grade ?
                                <p><b>Grade:</b> {assignment.grade} </p>
                                :
                                <p><b>Grade:</b> - </p>
                                }
                                <p className="date">{handleDate(assignment.date)}</p>
                                <div className="left-border"></div>
                            </div>     
                        )
                    }))
                    }
                    </>
                }
            </div>
        </div>
        </>
     );
}
 
export default Assignments;