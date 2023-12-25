import { useState } from 'react';

import more from '../images/more.png'
import check from '../images/check2.png'
import edit from '../images/pencil.png'
import trash from '../images/trash-can.png'
import undo from '../images/undo.png'

const NoteBox = ({color}) => {
    const [isMoreOpen, setMore] = useState(false)
    const [isEditPageOpen, setEditPage] = useState(false)


    const showMore = () => {
        setMore(!isMoreOpen)
    }

    const editTask = () => {
        setEditPage(!isEditPageOpen)
        setMore(false)
    }

    return ( 
        <>  {isEditPageOpen && 
            <div className="on-page-div">   
            <div className="add-form edit-task-form" >
                <div className="on-page-title">
                    <h3>Edit Task</h3>
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
                    <button onClick={()=>setEditPage(!isEditPageOpen)}>Cancel</button>
                    <button>Save</button>
                </div>
            </div>
            </div>
            }
        
            <div className="note-box" style={{backgroundColor: color}}>
            <img src={more} alt="More" className='show-more' onClick={showMore}/>
            <h4>Get the books</h4>
            <p>Spanish</p>
            <p>20-12-2023</p>
            <h5>get the books from the store</h5>
            {isMoreOpen &&
                <div className="note-more">
                    <div className='note-more2'>
                        <div>
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
                        <div>
                        <img src={trash} alt={trash} />
                        <h6>Delete</h6>
                        </div>
                    </div>
                </div>
            }
            </div>
        </>
     );
}
 
export default NoteBox;