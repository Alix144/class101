import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import add from '../images/plus.png'
import emptyBox from '../images/empty-box.png'
import copy from '../images/copy.png'
import noTask from '../images/no-task.png'

const ClassroomHome = () => {
    const link = "https://class101-api.onrender.com"
    const localLink = "http://localhost:4000"

    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)

    const [isCopied, setIsCopied] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true)
    const [isTaskEmpty, setIsTaskEmpty] = useState(true)

    // random text 
    const textAreaRef = useRef(null);
  
    const handleCopyClick = () => {
      if (textAreaRef.current) {
        textAreaRef.current.select();
        document.execCommand('copy');

        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
          }, 2000);
      }
    };

    const handleDate = (date) => {
        return moment(date).fromNow()
    }

    const id = useParams().id
    const userId = localStorage.userId;
    const [klass, setKlass] = useState('');
    const [tasks, setTasks] = useState('');

    const fetchDetails = async() => {
        const res = await axios.get(`${link}/class/view/class/${id}`).catch(err=>console.log(err))
        const data = await res.data;
        return data;
    }

    useEffect(()=>{ 
        fetchDetails()
        .then((data)=>{
            setKlass(data.class)
            setIsEmpty(data.class.announcements.length === 0);
            // console.log(klass)
            // console.log(isEmpty)
        })
    },[id])

    const fetchToDoDetails = async() => {
        const res = await axios.get(`${link}/task/view/${userId}`).catch(err=>console.log(err))
        const data = await res.data.tasks;
        console.log(data)
        return data;
    }

    useEffect(()=>{ 
        fetchToDoDetails()
        .then((data)=>{
            setTasks(data)
                        // Check if there are tasks for the given class ID
                        let hasTasksForClass;
                        data.map((task, index) => {
                            if(task.class){
                                if(task.class._id === id){
                                    hasTasksForClass = true
                                    return
                                }
                            }
                          });
                        // let hasTasksForClass = data.some((task) => task.class._id === id);

                        // Set the state based on whether there are tasks for the class ID
                        setIsTaskEmpty(!hasTasksForClass);
        })
    },[id])

    useEffect(() => {
        console.log(klass)
        console.log(isEmpty);
    }, [klass, isEmpty]);

    useEffect(() => {
        console.log("taskoo: " + isTaskEmpty)
    }, [isTaskEmpty]);

    return ( 
        <div className="content classroom-home">

            <div className="announcements-div">
                <div className="div-title">
                    <h4>Announcements</h4>
                </div>

                
                {isEmpty ? 
                    <div className="div-content">
                        <img src={emptyBox} alt="Empty-box" />
                        <p>This is were you can see your 
                        instructor’s announcements</p>
                    </div>
                :
                    <div className="announcement-home">
                    {klass.announcements.slice().reverse().map((announcement, index)=>(
                        
                            <div className="one-ppl" key={index} style={{width: '90%', cursor: "auto"}}>
                                <div className="left-border"></div>
                                <div className="info">
                                    <div className='announc-div'>
                                        <h5>{announcement.title}</h5>
                                    </div>
                                </div>
                                <p style={{fontSize: "12px"}}>{handleDate(announcement.date)}</p>
                            </div>
                    ))}
                    </div>
                }

            </div>

            <div className="code-todo-div">
                {isInstructor &&
                    <div className="code">
                        <div className="div-title">
                            <h4>Invitation Code</h4>
                        </div>
                        <div className='code-string'>
                            <textarea ref={textAreaRef} value={klass.invitationCode} style={{ position: 'absolute', left: '-9999px' }} readOnly />
                            {isCopied ? 
                                <h2 className='temp-message'>Copied!</h2>
                                :
                                <h2 onClick={handleCopyClick}>{klass.invitationCode}</h2>
                            }
                            <img src={copy} alt="Copy" onClick={handleCopyClick}/>
                        </div>

                    </div>
                }


                <div className="todo-div">
                    <div className="div-title">
                        <h4>To Do</h4>
                    </div>
                    {isTaskEmpty ? 
                    <div className="div-content">
                        <img src={noTask} alt="No-Task" id='no-task'/>
                        <p>No work to be done</p>
                    </div>
                    :
                    <div className="announcement-home">
                    {tasks.slice().reverse().map((task, index)=>{
                        if(task.class){
                        if(task.class._id === id){
                            return (
                            <div className="one-ppl" key={index} style={{width: '90%'}}>
                                <div className="left-border"></div>
                                <div className="info">
                                    <div className='announc-div'>
                                        <h5>{task.title}</h5>
                                    </div>
                                </div>
                                {task.deadline ?
                                <p style={{fontSize: "12px"}}><b>Deadline:</b><br /> {handleDate(task.deadline)}</p>
                                :
                                <p style={{fontSize: "12px"}}><b>Deadline:</b> -</p>

                                }
                            </div>
                            )
                        }}
                    })}
                    </div>
                }
                    
                </div>

            </div>
        </div>
                                   
     );
}
 
export default ClassroomHome;