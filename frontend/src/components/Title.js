import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import plus from '../images/plus.png'

const Title = ({propTitle, add}) => {
    const navigate = useNavigate();
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)
    const { id } = useParams();

    const [isAddTaskPageOpen, setAddTaskPage] = useState(false)
    const [isAddAnnouncementPageOpen, setAddAnnouncementPage] = useState(false)
    const [isAddAssignmentPageOpen, setAddAssignmentPage] = useState(false)
    const [isAddSyllabusPageOpen, setAddSyllabusPage] = useState(false)
    const [isAddDocPageOpen, setAddDocPage] = useState(false)
    const [isAddInstPageOpen, setAddInstPage] = useState(false)
    const [isAddStudentPageOpen, setAddStudentPage] = useState(false)
    const [fileName, setFileName] = useState('');
    const [week, setWeek] = useState("");
    const [topics, setTopics] = useState([{ id: 1, value: '' }]);

    //task
    const [title, setTitle] = useState("")
    const [deadline, setDeadline] = useState("")
    const [course, setCourse] = useState("")
    const [description, setDescription] = useState("")

    //announcement
    const [announcementTitle, setAnnouncementTitle] = useState("")
    const [announcementDescription, setAnnouncementDescription] = useState("")

    //documents
    const [docTitle, setDocTitle] = useState("")
    const [file, setFile] = useState("")

    //assignments
    const [HwTitle, setHwTitle] = useState("")
    const [HwDeadline, setHwDeadline] = useState("")
    const [HwDescription, setHwDescription] = useState("")

    const handleTopicChange = (id, value) => {
      const updatedTopics = topics.map((topic) =>
        topic.id === id ? { ...topic, value } : topic
      );
      setTopics(updatedTopics);
    };
  
    const handleAddTopic = () => {
      setTopics([...topics, { id: topics.length + 1, value: '' }]);
    };
  

    const handleFileChange = (event) => {
      const fileInput = event.target;
      if (fileInput.files.length > 0) {
        setFileName(fileInput.files[0].name);
        setFile(event.target.files[0])
      } else {
        setFileName('Upload');
      }

    }

    /*******************/
    //add task
    const addTask = async() => {
        const res = await axios.post("http://localhost:4000/task/add", {
            title,
            deadline,
            description,
            user: localStorage.getItem('userId')
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleAddTask = (e) => {
        e.preventDefault()
        addTask().then(() => {
            // navigate("dashboard/todo");
            window.location.reload();
        });
    }

    //add announcement
    const addAnnouncement = async() => {
        const res = await axios.post("http://localhost:4000/announcement/add", {
            title: announcementTitle,
            description: announcementDescription,
            user: localStorage.getItem('userId'),
            klass: id
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleAddAnnouncement = (e) => {
        e.preventDefault()
        addAnnouncement().then(() => {
            window.location.reload();
        });
    }

    //add syllabus
    const addSyllabus = async() => {
        const res = await axios.post("http://localhost:4000/syllabus/add", {
            week,
            topics,
            klass: id
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleAddSyllabus = (e) => {
        e.preventDefault()
        addSyllabus().then(() => {
            // navigate("dashboard/todo");
            window.location.reload();
        });
    }

    //add document
    const addDocument = async() => {

        const formData = new FormData();
        formData.append("title", docTitle);
        formData.append("file", file);
        formData.append("klass", id);
        
        const res = await axios.post("http://localhost:4000/document/add", formData)
        .catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleAddDocument = (e) => {
        e.preventDefault()
        addDocument().then(() => {
            window.location.reload();
        });
    }


    //add assignment
    const addAssignment = async() => {

        const formData = new FormData();
        formData.append("title", HwTitle);
        formData.append("description", HwDescription);
        formData.append("file", file);
        formData.append("klass", id);
        formData.append("deadline", HwDeadline);
        
        const res = await axios.post("http://localhost:4000/assignment/add", formData)
        .catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleAddAssignment = (e) => {
        e.preventDefault()
        addAssignment().then(() => {
            window.location.reload();
        });
    }

    return ( 
        <>
        {isAddTaskPageOpen && 
            <div className="on-page-div">   
            <div className="add-form edit-task-form" >
                <div className="on-page-title">
                    <h3>Add Task</h3>
                    <hr />
                </div>
                <form action="">
                    <div>
                        <label htmlFor="title">Title*</label>
                        <input type="text" id="title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="deadline">Deadline</label>
                        <input type="date" id="deadline" name="deadline" value={deadline} onChange={(e)=>setDeadline(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="courses">Course</label>
                        <select id="courses" name="courses" value={course} onChange={(e)=>setCourse(e.target.value)}>
                            <option selected>Select a Course</option>
                            <option>Math</option>
                            <option>Spanish</option>
                            <option>Biology</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="desc">Description</label>
                        <textarea name="desc" id="desc" cols="30" rows="5" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                    </div>

                </form>
                <div className="on-page-btns">
                    <button onClick={()=>setAddTaskPage(!isAddTaskPageOpen)}>Cancel</button>
                    <button onClick={handleAddTask}>Add</button>
                </div>
            </div>
            </div>
        }

        {isAddAnnouncementPageOpen && 
        <div className="on-page-div">   
            <div className="add-form edit-task-form" >
                <div className="on-page-title">
                    <h3>Add Announcement</h3>
                    <hr />
                </div>
                <form action="">
                    <div>
                        <label htmlFor="title">Title*</label>
                        <input type="text" id="title" name="title" value={announcementTitle} onChange={(e)=>setAnnouncementTitle(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="desc">Description</label>
                        <textarea name="desc" id="desc" cols="30" rows="5" value={announcementDescription} onChange={(e)=>setAnnouncementDescription(e.target.value)}></textarea>
                    </div>

                </form>
                <div className="on-page-btns">
                    <button onClick={()=>setAddAnnouncementPage(!isAddAnnouncementPageOpen)}>Cancel</button>
                    <button onClick={handleAddAnnouncement}>Add</button>
                </div>
            </div>
        </div>
        }

        {isAddAssignmentPageOpen && 
        <div className="on-page-div">   
            <div className="add-form edit-task-form" >
                <div className="on-page-title">
                    <h3>New Assignment</h3>
                    <hr/>
                </div>
                <form action="">
                    <div>
                        <label htmlFor="title">Title*</label>
                        <input type="text" id="title" name="title" value={HwTitle} onChange={e=>setHwTitle(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="deadline">Deadline</label>
                        <input type="date" id="deadline" name="deadline" value={HwDeadline} onChange={e=>setHwDeadline(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="desc">Description</label>
                        <textarea name="desc" id="desc" cols="30" rows="5" value={HwDescription} onChange={e=>setHwDescription(e.target.value)}></textarea>
                    </div>

                    <div>
                        <label htmlFor="file">Document</label>
                        <label htmlFor="file" className='upload no-mrgn'>Upload</label>
                        <input type="file" id="file" onChange={handleFileChange}/>
                        <p>{fileName}</p>
                    </div>

                </form>
                <div className="on-page-btns">
                    <button onClick={()=>setAddAssignmentPage(!isAddAssignmentPageOpen)}>Cancel</button>
                    <button onClick={handleAddAssignment}>Add</button>
                </div>
            </div>
        </div>
        }

        {isAddSyllabusPageOpen && 
        <div className="on-page-div">   
            <div className="add-form edit-task-form" >
                <div className="on-page-title">
                    <h3>Add Syllabus</h3>
                    <hr/>
                </div>
                <form action="">
                    <div>
                        <label htmlFor="week">week*</label>
                        <input type="number" min={0} id="week" name="week" value={week} onChange={(e)=>setWeek(e.target.value)}/>
                    </div>

                    {topics.map((topic) => (
                    <div key={topic.id}>
                      <label htmlFor={`topic-${topic.id}`}>Topic {topic.id}</label>
                      <input type="text" id={`topic-${topic.id}`} name={`topic-${topic.id}`} value={topic.value} onChange={(e) => handleTopicChange(topic.id, e.target.value)}/>
                    </div>
                    ))}

                <button type="button" className='add-topic no-mrgn' onClick={handleAddTopic}>Add Topic</button>
                </form>

                <div className="on-page-btns">
                    <button onClick={()=>setAddSyllabusPage(!isAddSyllabusPageOpen)}>Cancel</button>
                    <button onClick={handleAddSyllabus}>Add</button>
                </div>
            </div>
        </div>
        }

        {isAddDocPageOpen && 
        <div className="on-page-div">   
            <div className="add-form edit-task-form" >
                <div className="on-page-title">
                    <h3>New Document</h3>
                    <hr/>
                </div>
                <form action="">
                    <div>
                        <label htmlFor="title">Title*</label>
                        <input type="text" id="title" name="title" value={docTitle} onChange={(e)=>setDocTitle(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="file">Document</label>
                        <label htmlFor="file" className='upload no-mrgn'>Upload</label>
                        <input type="file" id="file" onChange={handleFileChange}/>
                        <p>{fileName}</p>
                    </div>

                </form>
                <div className="on-page-btns">
                    <button onClick={()=>setAddDocPage(!isAddDocPageOpen)}>Cancel</button>
                    <button onClick={handleAddDocument}>Add</button>
                </div>
            </div>
        </div>
        }

        {isAddInstPageOpen && 
        <div className="on-page-div">   
            <div className="add-form edit-task-form" >
                <div className="on-page-title">
                    <h3>Add Instructor</h3>
                    <hr/>
                </div>
                <form action="">
                    <div>
                        <label htmlFor="email">Email*</label>
                        <input type="email" id="email" name="email"/>
                    </div>

                </form>
                <div className="on-page-btns">
                    <button onClick={()=>setAddInstPage(!isAddInstPageOpen)}>Cancel</button>
                    <button>Invite</button>
                </div>
            </div>
        </div>
        }

        {isAddStudentPageOpen && 
        <div className="on-page-div">   
            <div className="add-form edit-task-form" >
                <div className="on-page-title">
                    <h3>Add Student</h3>
                    <hr/>
                </div>
                <form action="">
                    <div>
                        <label htmlFor="email">Email*</label>
                        <input type="email" id="email" name="email"/>
                    </div>

                </form>
                <div className="on-page-btns">
                    <button onClick={()=>setAddStudentPage(!isAddStudentPageOpen)}>Cancel</button>
                    <button>Invite</button>
                </div>
            </div>
        </div>
        }

        <div className="title">
            <div>
                <h3>{propTitle}</h3>
                {add &&
                <>
                    {add === "toDo" &&
                        <img src={plus} alt="Add" onClick={()=>setAddTaskPage(!isAddTaskPageOpen)}/>
                    }
                    
                    {add === "announcements" &&
                        <img src={plus} alt="Add" onClick={()=>setAddAnnouncementPage(!isAddAnnouncementPageOpen)}/>
                    }

                    {add === "addAssignment" &&
                        <img src={plus} alt="Add" onClick={()=>setAddAssignmentPage(!isAddAssignmentPageOpen)}/>
                    }

                    {add === "addSyllabus" &&
                        <img src={plus} alt="Add" onClick={()=>setAddSyllabusPage(!isAddSyllabusPageOpen)}/>
                    }

                    {add === "documents" &&
                        <img src={plus} alt="Add" onClick={()=>setAddDocPage(!isAddDocPageOpen)}/>
                    }

                    {add === "add-instructors" &&
                        <img src={plus} alt="Add" onClick={()=>setAddInstPage(!isAddInstPageOpen)}/>
                    }

                    {add === "add-student" &&
                        <img src={plus} alt="Add" onClick={()=>setAddStudentPage(!isAddStudentPageOpen)}/>
                    }
                </>
                }
            </div>
            <hr />
        </div>
        </>
     );
}
 
export default Title;