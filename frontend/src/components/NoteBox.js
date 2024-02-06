import { useState, useEffect } from 'react';
import axios from "axios";

import more from '../images/more.png'
import check from '../images/check2.png'
import edit from '../images/pencil.png'
import trash from '../images/trash-can.png'
import undo from '../images/undo.png'

import { motion } from "framer-motion";
const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
const NoteBox = ({id, title, description, deadline, isCompleted}) => {
    const [isMoreOpen, setMore] = useState(false)
    const [isEditPageOpen, setEditPage] = useState(false)
    const [formattedDate, setFormattedDate] = useState("")

    const [newTitle, setNewTitle] = useState("")
    const [newDeadline, setNewDeadline] = useState("")
    const [newCourse, setNewCourse] = useState("")
    const [newDescription, setNewDescription] = useState("")

    const color = isCompleted ? "#E1FFA0" : "#FFD464"; 

    const showMore = () => {
        setMore(!isMoreOpen)
    }

    const editTask = () => {
        setEditPage(!isEditPageOpen)
        setMore(false)
    }

    useEffect(() => {
        if (deadline) {
            const date = new Date(deadline);
            setFormattedDate(date.toLocaleDateString());
        }
    }, [deadline]);

    useEffect(()=>{ 
        setNewTitle(title)
        if(deadline)
            setNewDeadline(deadline);
        // if(course)
        //     setNewCourse(course)
        if(description)
            setNewDescription(description);

    },[])

    /************************/
    //complete task / undo
    const triggerComplete = async() => {
        const res = await axios.put(`http://localhost:4000/task/complete/${id}`, {
            isCompleted: !isCompleted,
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleComplete = (e) => {
        e.preventDefault()
        triggerComplete().then(() => {
            window.location.reload();
        });
    }

    //delete
    const deleteTask = async() => {
        const res = await axios.delete(`http://localhost:4000/task/delete/${id}`)
        .catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleDelete = (e) => {
        e.preventDefault()
        deleteTask().then(() => {
            window.location.reload();
        });
    }

    //update
    const update = async() => {
        const res = await axios.put(`http://localhost:4000/task/edit/${id}`,{
            title: newTitle,
            deadline: newDeadline,
            description: newDescription,
        }).catch(err=>console.log(err))
        const data = await res.data;
        return data;
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        update().then(data=>console.log(data)).then(alert("Updated Successfully")).then(window.location.reload())
    }

    return ( 
        <>  
            {isEditPageOpen && 
            <div className="on-page-div">   
            <div className="add-form edit-task-form" >
                <div className="on-page-title">
                    <h3>Edit Task</h3>
                    <hr />
                </div>
                <form action="">
                    <div>
                        <label htmlFor="title">Title*</label>
                        <input type="text" id="title" name="title" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="deadline">Deadline</label>
                        <input type="date" id="deadline" name="deadline" value={newDeadline} onChange={(e)=>setNewDeadline(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="courses">Course</label>
                        <select id="courses" name="courses" value={newCourse} onChange={(e)=>setNewCourse(e.target.value)}>
                            <option selected>Select a Course</option>
                            <option>Math</option>
                            <option>Spanish</option>
                            <option>Biology</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="desc">Description</label>
                        <textarea name="desc" id="desc" cols="30" rows="5" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}></textarea>
                    </div>
                </form>

                <div className="on-page-btns">
                    <button onClick={()=>setEditPage(!isEditPageOpen)}>Cancel</button>
                    <button onClick={handleUpdate}>Save</button>
                </div>
            </div>
            </div>
            }
        
            <motion.div className="note-box" style={{backgroundColor: color}}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <img src={more} alt="More" className='show-more' onClick={showMore}/>
                <h4>{title}</h4>
                <p>Spanish</p>
                <p>{formattedDate}</p>
                <h5>{description}</h5>
            
                {isMoreOpen &&
                    <div className="note-more">
                    <div className='note-more2'>
                        <div onClick={handleComplete}>
                        {color === "#E1FFA0" ? 
                        <>
                        <img src={undo} alt="Undo" />
                        <h6>Undo</h6>
                        </>       
                        :
                        <>
                        <img src={check} alt="Check" />
                        <h6>Complete</h6>
                        </>
                        }
                        </div>
                    </div>

                    <hr />

                    <div className='note-more2' onClick={editTask}>
                        <div>
                        <img src={edit} alt="edit" />
                        <h6>Edit</h6>
                        </div>
                    </div>

                    <hr />

                    <div className='note-more2'>
                        <div onClick={handleDelete}>
                            <img src={trash} alt={trash} />
                            <h6>Delete</h6>
                        </div>
                    </div>
                    </div>
                }
            </motion.div>
        </>
     );
}
 
export default NoteBox;