import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import plus from '../images/plus.png'
import search from '../images/search.png'
import search2 from '../images/search2.png'
import teacher from '../images/teacher.png'
import student from '../images/student.png'

const Title = ({propTitle, add}) => {
    const navigate = useNavigate();
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)
    const { id } = useParams();
    const userId = localStorage.getItem('userId')

    const [query, setQuery] = useState("");
    const [isAddTaskPageOpen, setAddTaskPage] = useState(false)
    const [isAddAnnouncementPageOpen, setAddAnnouncementPage] = useState(false)
    const [isAddAssignmentPageOpen, setAddAssignmentPage] = useState(false)
    const [isAddSyllabusPageOpen, setAddSyllabusPage] = useState(false)
    const [isAddDocPageOpen, setAddDocPage] = useState(false)
    const [isAddInstPageOpen, setAddInstPage] = useState(false)
    const [isAddStudentPageOpen, setAddStudentPage] = useState(false)
    const [isSearchClassOpen, setSearchClass] = useState(false)
    const [fileName, setFileName] = useState('');
    const [week, setWeek] = useState("");
    const [topics, setTopics] = useState([{ id: 1, value: '' }]);

    const [selectedClass, setSelectedClass] = useState("")
    const [selectedUser, setSelectedUser] = useState("")

    const [allClasses, setAllClasses] = useState([]);
    const [classes, setClasses] = useState([]);

    const [error, setError] = useState("")

    // for sending in invitation
    const [email, setEmail] = useState("")

    //get user classes
    const fetchClasses = async() => {
        console.log(userId)
        const res = await axios.get(`http://localhost:4000/class/view/${userId}`).catch(err=>console.log(err))
        const data = await res.data.classes;
        console.log(data)
        return data;
    }

    useEffect(()=>{ 
        fetchClasses()
        .then((data)=>{
            setClasses(data)
        })
    },[isAddTaskPageOpen])

    //get all classes
    const getAllClasses = async() => {
        const res = await axios.get("http://localhost:4000/class/").catch(err=>console.log(err))
        const data = await res.data.classes;
        console.log(data)
        return data;
    }

    useEffect(()=>{ 
        getAllClasses()
        .then((data)=>{
            setAllClasses(data)
        })
    },[isSearchClassOpen])

    //get all classes
    const [users, setUsers] = useState([]);

    const getAllUsers = async() => {
        const res = await axios.get("http://localhost:4000/user/").catch(err=>console.log(err))
        const data = await res.data.users;
        console.log(data)
        return data;
    }

    useEffect(()=>{ 
        getAllUsers()
        .then((data)=>{
            setUsers(data)
        })
    },[isAddStudentPageOpen, isAddInstPageOpen])


    //task
    const [title, setTitle] = useState("")
    const [deadline, setDeadline] = useState("")
    const [course, setCourse] = useState(null)
    const [description, setDescription] = useState("")

    useEffect(()=>{ 
        console.log("course is: "+course)
    },[course])

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
      if(fileInput.files.length > 0) {
        setFileName(fileInput.files[0].name);
        setFile(event.target.files[0])
      } else {
        setFileName('Upload');
      }
    }

    const closeInviteStudent = () => {
        setAddStudentPage(!isAddStudentPageOpen)
        setEmail("")
    }

    const closeInviteInstructor = () => {
        setAddInstPage(!isAddInstPageOpen)
        setEmail("")
    }

    /*******************/
    //add task
    const addTask = async() => {
        const res = await axios.post("http://localhost:4000/task/add", {
            title,
            deadline,
            description,
            klass: course,
            user: userId
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

    //search class
    const selectClass = (id) => {
        setSelectedClass(id)
    }

    //search user
    const selectUser = (id, userEmail) => {
        setSelectedUser(id)
        setEmail(userEmail)
    }

    //join class
    const joinClass = async() => {
        const res = await axios.put(`http://localhost:4000/class/join/class/${selectedClass}`, {
            userId,
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleJoinClass = (e) => {
        e.preventDefault()
        console.log("clicked")
        if(!selectedClass){
            setError("Please select a class!")
        }else{
            joinClass().then((data) => {
                console.log(data)
                navigate(`/dashboard/classroom/${data.existingClass._id}/home`);
                window.location.reload();
            });
        }
    }

    // //invite student ***new**
    // const inviteStudents = async() => {
    //     const res = await axios.put(`http://localhost:4000/class/join/class/${selectedClass}`, {
    //         userId,
    //     }).catch(err=>console.log(err));
    //     const data = await res.data;
    //     console.log(data)
    //     return data;
    // }

    // const handleJoinClass = (e) => {
    //     e.preventDefault()
    //     console.log("clicked")
    //     if(!selectedClass){
    //         setError("Please select a class!")
    //     }else{
    //         joinClass().then((data) => {
    //             console.log(data)
    //             navigate(`/dashboard/classroom/${data.existingClass._id}/home`);
    //             window.location.reload();
    //         });
    //     }
    // }


    //invite instructor
    const inviteInstructor = async() => {
        const res = await axios.post("http://localhost:4000/invite/instructor", {
            from: userId,
            klass: id,
            email,
            asInstructor: true,
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleInviteInstructor = (e) => {
        e.preventDefault()
        inviteInstructor().then(() => {
            window.location.reload();
        });
    }

    //invite student
    const inviteStudent = async() => {
        const res = await axios.post("http://localhost:4000/invite/student", {
            from: userId,
            klass: id,
            email,
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleInviteStudent = (e) => {
        e.preventDefault()
        inviteStudent().then((data) => {
            console.log(data)
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
                            <option selected value={"null"}>Select a Course</option>
                            {classes.map((klass, index)=>(
                                <option key={klass._id} value={klass._id}>{klass.name}</option>   
                            ))}
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

                <div className="people-parent-div" style={{width: "80%"}}>
                    <div className="ppl-search">
                        <img src={search} alt="Search" />
                        <input type="text" name="" id="" onChange={e=>setQuery(e.target.value)} style={{boxShadow: "none"}}/>
                    </div>

                <div className="people">
                {users.filter(user=>user.email.toLowerCase().includes(query) && user._id != userId).map((user)=>(
                    
                    <div className={`one-ppl ${user._id === selectedUser ? "selected-class" : ""}` } onClick={()=>selectUser(user._id, user.email)} key={user._id}>
                        <div className="left-border"></div>
                        <div className="info">
                            <div className="profile-pic" style={{backgroundColor: `${user.color}`}}>{user.name && user.name[0]}</div>
                            <div>
                                <h4>{user.name && user.name}</h4>
                            </div>
                        </div>
                        <div className='search-class-members'>
                            <p>{user.email}</p>
                        </div>
                    </div>

                ))}
                    
                </div>

                <hr className="hr"/>
                </div>
                
                <div className="on-page-btns">
                    <button onClick={closeInviteInstructor}>Cancel</button>
                    <button onClick={handleInviteInstructor}>Invite</button>
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

                <div className="people-parent-div" style={{width: "80%"}}>
                    <div className="ppl-search">
                        <img src={search} alt="Search" />
                        <input type="text" name="" id="" onChange={e=>setQuery(e.target.value)} style={{boxShadow: "none"}}/>
                    </div>

                <div className="people">
                {users.filter(user=>user.email.toLowerCase().includes(query) && user._id != userId).map((user)=>(
                    
                    <div className={`one-ppl ${user._id === selectedUser ? "selected-class" : ""}` } onClick={()=>selectUser(user._id, user.email)} key={user._id}>
                        <div className="left-border"></div>
                        <div className="info">
                            <div className="profile-pic" style={{backgroundColor: `${user.color}`}}>{user.name && user.name[0]}</div>
                            <div>
                                <h4>{user.name && user.name}</h4>
                            </div>
                        </div>
                        <div className='search-class-members'>
                            <p>{user.email}</p>
                        </div>
                    </div>

                ))}
                    
                </div>

                <hr className="hr"/>
                </div>

                <div className="on-page-btns">
                    <button onClick={closeInviteStudent}>Cancel</button>
                    <button onClick={handleInviteStudent}>Invite</button>
                </div>
            </div>
        </div>
        }

        {isSearchClassOpen && 
        <div className="on-page-div">   
            <div className="add-form edit-task-form" >
                <div className="on-page-title">
                    <h3>Search Class</h3>
                    <hr/>
                </div>

                <div className="people-parent-div" style={{width: "80%"}}>
                    <div className="ppl-search">
                        <img src={search} alt="Search" />
                        <input type="text" name="" id="" onChange={e=>setQuery(e.target.value)} style={{boxShadow: "none"}}/>
                    </div>

                <div className="people">
                {allClasses.filter(klass=>klass.name.toLowerCase().includes(query) && klass.visibility === "public").map((klass)=>(
                    
                    <div className={`one-ppl ${klass._id === selectedClass ? "selected-class" : ""}` } onClick={()=>selectClass(klass._id)} key={klass._id}>
                        <div className="left-border"></div>
                        <div className="info">
                            <div className="profile-pic" style={{backgroundColor: `${klass.classColor}`}}>{klass.name && klass.name[0]}</div>
                            <div>
                                <h4>{klass.name && klass.name}</h4>
                                <p style={{fontSize: "12px"}}><b>Instructor:</b> {klass && klass.instructors[0].name} {klass && klass.instructors[0].surname}</p>
                            </div>
                        </div>
                        <div className='search-class-members'>
                            <div>
                                <img src={teacher} alt="Instructors"/>
                                <p>{klass.instructors.length}</p>
                            </div>
                            <div>
                                <img src={student} alt="students"/>
                                <p>{klass.students.length}</p>
                            </div>
                        </div>
                    </div>

                ))}
                    
                </div>

                <hr className="hr"/>
                </div>

                <div className="on-page-btns">
                    <button onClick={()=>setSearchClass(!isSearchClassOpen)}>Cancel</button>
                    <button onClick={handleJoinClass}>Join</button>
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
                    {add === "searchClass" &&
                        <img src={search2} alt="Add" onClick={()=>setSearchClass(!isSearchClassOpen)}/>
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