import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import axios from "axios";

import add from '../images/plus.png'
import emptyBox from '../images/empty-box.png'
import copy from '../images/copy.png'
import noTask from '../images/no-task.png'

const ClassroomHome = () => {
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)

    const [isCopied, setIsCopied] = useState(false);
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


    const id = useParams().id
    const [klass, setKlass] = useState("");

    const fetchDetails = async() => {
        const res = await axios.get(`http://localhost:4000/class/view/class/${id}`).catch(err=>console.log(err))
        const data = await res.data;
        return data;
    }

    useEffect(()=>{ 
        fetchDetails()
        .then((data)=>{
            setKlass(data.class)
            console.log(klass)
        })
    },[])

    return ( 
        <div className="content classroom-home">
            <div className="announcements-div">
                <div className="div-title">
                    <h4>Announcements</h4>
                </div>
                <div className="div-content">
                    <img src={emptyBox} alt="Empty-box" />
                    <p>This is were you can see your 
                        instructor’s announcements</p>
                </div>
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
                    <div className="div-content">
                        <img src={noTask} alt="No-Task" id='no-task'/>
                        <p>No work to be done</p>
                    </div>
                </div>
            </div>
        </div>
                                   
     );
}
 
export default ClassroomHome;