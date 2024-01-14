import { useState } from 'react';
import plus from '../images/plus.png'

const Title = ({propTitle, add}) => {
    const [isAddTaskPageOpen, setAddTaskPage] = useState(false)
    const [isAddAnnouncementPageOpen, setAddAnnouncementPage] = useState(false)
    const [isAddAssignmentPageOpen, setAddAssignmentPage] = useState(false)
    const [isAddDocPageOpen, setAddDocPage] = useState(false)
    const [isAddInstPageOpen, setAddInstPage] = useState(false)
    const [isAddStudentPageOpen, setAddStudentPage] = useState(false)
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
      const fileInput = event.target;
      if (fileInput.files.length > 0) {
        setFileName(fileInput.files[0].name);
      } else {
        setFileName('Upload');
      }
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
                        <input type="text" id="title" name="title"/>
                    </div>

                    <div>
                        <label htmlFor="deadline">Deadline</label>
                        <input type="date" id="deadline" name="deadline"/>
                    </div>

                    <div>
                        <label htmlFor="courses">Course</label>
                        <select id="courses" name="courses">
                            <option selected>Select a Course</option>
                            <option>Math</option>
                            <option>Spanish</option>
                            <option>Biology</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="desc">Description</label>
                        <textarea name="desc" id="desc" cols="30" rows="5"></textarea>
                    </div>

                </form>
                <div className="on-page-btns">
                    <button onClick={()=>setAddTaskPage(!isAddTaskPageOpen)}>Cancel</button>
                    <button>Save</button>
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
                        <input type="text" id="title" name="title"/>
                    </div>

                    <div>
                        <label htmlFor="desc">Description</label>
                        <textarea name="desc" id="desc" cols="30" rows="5"></textarea>
                    </div>

                </form>
                <div className="on-page-btns">
                    <button onClick={()=>setAddAnnouncementPage(!isAddAnnouncementPageOpen)}>Cancel</button>
                    <button>Add</button>
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
                        <input type="text" id="title" name="title"/>
                    </div>

                    <div>
                        <label htmlFor="deadline">Deadline</label>
                        <input type="date" id="deadline" name="deadline"/>
                    </div>

                    <div>
                        <label htmlFor="desc">Description</label>
                        <textarea name="desc" id="desc" cols="30" rows="5"></textarea>
                    </div>

                    <div>
                        <label htmlFor="file">Document</label>
                        <label htmlFor="file" className='upload'>Upload</label>
                        <input type="file" id="file" onChange={handleFileChange}/>
                        <p>{fileName}</p>
                    </div>

                </form>
                <div className="on-page-btns">
                    <button onClick={()=>setAddAssignmentPage(!isAddAssignmentPageOpen)}>Cancel</button>
                    <button>Add</button>
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
                        <input type="text" id="title" name="title"/>
                    </div>

                    <div>
                        <label htmlFor="file">Document</label>
                        <label htmlFor="file" className='upload'>Upload</label>
                        <input type="file" id="file" onChange={handleFileChange}/>
                        <p>{fileName}</p>
                    </div>

                </form>
                <div className="on-page-btns">
                    <button onClick={()=>setAddDocPage(!isAddDocPageOpen)}>Cancel</button>
                    <button>Add</button>
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

                    {add === "syllabus" &&
                        <img src={plus} alt="Add" onClick={()=>setAddTaskPage(!isAddTaskPageOpen)}/>
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