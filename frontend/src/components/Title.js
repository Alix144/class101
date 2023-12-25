import { useState } from 'react';
import plus from '../images/plus.png'

const Title = ({propTitle, add}) => {
    const [isAddTaskPageOpen, setAddTaskPage] = useState(false)

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
                        <label htmlFor="">Title*</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label htmlFor="">Deadline</label>
                        <input type="date" />
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
                        <label htmlFor="">Description</label>
                        <textarea name="" id="" cols="30" rows="5"></textarea>
                    </div>

                </form>
                <div className="on-page-btns">
                    <button onClick={()=>setAddTaskPage(!isAddTaskPageOpen)}>Cancel</button>
                    <button>Save</button>
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
                </>
                }
            </div>
            <hr />
        </div>
        </>
     );
}
 
export default Title;