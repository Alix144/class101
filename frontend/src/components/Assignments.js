import { useState } from 'react';
import { useSelector } from 'react-redux'

import Title from "./Title";

import doc from '../images/doc.png'
import leaf from '../images/leaf.png'
import download from '../images/download.png'

const Assignments = () => {
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)

    const [isStudentHwOpen, setIsStudentHwOpen] = useState(false)

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
                <div className="assignment">
                    <div className="info">
                        <img src={doc} alt="Document" />
                        <div>
                            <h4>Spanish Assignment 1</h4>
                            <h6>Deadline:</h6><p>22-10-2024</p>
                        </div>
                    </div>
                    <img src={download} alt="Download" />
                    <p className="date">01-06-2024</p>
                    <div className="left-border"></div>
                </div>

                <div className="assignment">
                    <div className="info">
                        <img src={doc} alt="Document" />
                        <div>
                            <h4>Spanish Assignment 1</h4>
                            <h6>Deadline:</h6><p>22-10-2024</p>
                        </div>
                    </div>
                    <img src={download} alt="Download" />
                    <p className="date">01-06-2024</p>
                    <div className="left-border"></div>
                </div>
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