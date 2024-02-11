import { useState } from 'react';
import { useSelector } from 'react-redux'

import teacher from '../images/teacher.png'
import student from '../images/student.png'
import pen from '../images/pen.png'

import bg1 from '../images/classBgs/bg1.jpg'
import bg2 from '../images/classBgs/bg2.jpg'
import bg3 from '../images/classBgs/bg3.jpg'
import bg4 from '../images/classBgs/bg4.jpg'
import bg5 from '../images/classBgs/bg5.jpg'
import bg6 from '../images/classBgs/bg6.jpg'
import bg7 from '../images/classBgs/bg7.jpg'
import bg8 from '../images/classBgs/bg8.jpg'
import bg9 from '../images/classBgs/bg9.jpg'

import noImg from '../images/no-img.png'
import info from '../images/info.png'
import upload from '../images/upload.png'
import check from '../images/check.png'

const ClassInfo = ({name, courseCode, description, maxStudents, classColor, instructors, students}) => {
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)

    const [isCustomizeDivOpen, setCustomizeDiv] = useState(false)
    const [isClassInfoOpen, setClassInfoDiv] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedBg, setSelectedBg] = useState("bg3");

    const handleClick = (index) => {
        setSelectedBg(index)
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];    
        setSelectedImage(file);
        setSelectedBg("bg9")
      };

    return ( 
        <>
        {isCustomizeDivOpen && 
            <div className="on-page-div">
                <div className="add-form customize-form" >
                    <div className="on-page-title">
                        <h3>Customize</h3>
                        <hr />
                    </div>
                    <form action="">
                            <p>Background Image</p>
                            <div className="bgs">
                                <div className='bg' style={{backgroundImage: `url(${bg1})`}} onClick={()=>handleClick("bg1")}> <div className={`${selectedBg ==="bg1" ? 'selected-bg' : ''}`}> {selectedBg ==="bg1" && <img src={check} alt="check"/>} </div> </div>
                                <div className='bg' style={{backgroundImage: `url(${bg2})`}} onClick={()=>handleClick("bg2")}> <div className={`${selectedBg ==="bg2" ? 'selected-bg' : ''}`}> {selectedBg ==="bg2" && <img src={check} alt="check"/>} </div> </div>
                                <div className='bg' style={{backgroundImage: `url(${bg3})`}} onClick={()=>handleClick("bg3")}> <div className={`${selectedBg ==="bg3" ? 'selected-bg' : ''}`}> {selectedBg ==="bg3" && <img src={check} alt="check"/>} </div> </div>
                                <div className='bg' style={{backgroundImage: `url(${bg4})`}} onClick={()=>handleClick("bg4")}> <div className={`${selectedBg ==="bg4" ? 'selected-bg' : ''}`}> {selectedBg ==="bg4" && <img src={check} alt="check"/>} </div> </div>
                                <div className='bg' style={{backgroundImage: `url(${bg5})`}} onClick={()=>handleClick("bg5")}> <div className={`${selectedBg ==="bg5" ? 'selected-bg' : ''}`}> {selectedBg ==="bg5" && <img src={check} alt="check"/>} </div> </div>
                                <div className='bg' style={{backgroundImage: `url(${bg6})`}} onClick={()=>handleClick("bg6")}> <div className={`${selectedBg ==="bg6" ? 'selected-bg' : ''}`}> {selectedBg ==="bg6" && <img src={check} alt="check"/>} </div> </div>
                                <div className='bg' style={{backgroundImage: `url(${bg7})`}} onClick={()=>handleClick("bg7")}> <div className={`${selectedBg ==="bg7" ? 'selected-bg' : ''}`}> {selectedBg ==="bg7" && <img src={check} alt="check"/>} </div> </div>
                                <div className='bg' style={{backgroundImage: `url(${bg8})`}} onClick={()=>handleClick("bg8")}> <div className={`${selectedBg ==="bg8" ? 'selected-bg' : ''}`}> {selectedBg ==="bg8" && <img src={check} alt="check"/>} </div> </div>
                                {selectedImage ? (
                                <div className='bg' style={{backgroundImage: `url(${URL.createObjectURL(selectedImage)})`}} onClick={()=>handleClick("bg9")}> <div className={`${selectedBg === "bg9" ? 'selected-bg' : ''}`}> {selectedBg ==="bg9" && <img src={check} alt="check"/>} </div></div>
                                ) :
                                <div className='bg'><img src={noImg} alt="No-Uploaded-Img" className='no-img'/></div>
                                }       
                                <label htmlFor="uploadBg" className='upload'> <img src={upload} alt="upload" /> Upload</label>
                                <input type="file" accept="image/*" id='uploadBg' className='upload' onChange={handleImageChange}/>                         
                            </div>
                            <label htmlFor="">Class Color</label>
                            <div className="colors" style={{width:"50%", marginLeft: "50px"}}>
                                <div style={{backgroundColor: "#74BCFF"}}></div>
                                <div style={{backgroundColor: "#86FFAF"}}></div>
                                <div style={{backgroundColor: "#B63EFF"}}></div>
                                <div style={{backgroundColor: "#FF6464"}}></div>
                                <div style={{backgroundColor: "#FFD15A"}}></div>
                            </div>
                    </form>
                    <div className="on-page-btns">
                        <button onClick={()=>setCustomizeDiv(false)}>close</button>
                        <button>Save</button>
                    </div>
                </div>
            </div>
        }

        {isClassInfoOpen && 
            <div className="on-page-div">
                <div className="add-form" style={{marginTop:'0'}}>
                    <div className="on-page-title">
                        <h3>Class Details</h3>
                        <hr />
                    </div>
                    <form action="">
                        <div>
                            <p>Name*</p>
                            {isInstructor?
                                <input type="text"/>
                                :
                                <input type="text" readOnly/>
                            }
                            
                        </div>
                        <div>
                            <label htmlFor="code">Course Code</label>
                            {isInstructor?
                                <input type="text" id="code" name="code"/>
                                :
                                <input type="text" id="code" name="code" readOnly/>
                            }
                            
                        </div>
                        <div>
                            <label htmlFor="desc">Description</label>
                            {isInstructor?
                                <textarea name="desc" id="desc"  rows="5"></textarea>
                                :
                                <textarea name="desc" id="desc"  rows="5" readOnly></textarea>
                            }
                        </div>
                        <div>
                            <label htmlFor="max">Max Students</label>
                            {isInstructor?
                                <input type="number" min={1} className='type-number' name="max" id="max"/>
                                :
                                <input type="number" min={1} className='type-number' name="max" id="max" readOnly/>
                            }
                        </div>
                    </form>
                    <div className="on-page-btns">
                        <button onClick={()=>setClassInfoDiv(!isClassInfoOpen)}>Close</button>
                        {isInstructor &&
                        <button>Edit</button>
                        }
                    </div>
                </div>
            </div>
        }

        <div className="class-info">
            <div className='class-name-pic'>
                <div className='default-pic' style={{backgroundColor: {classColor}}}>{name[0].toUpperCase()}</div>
                <h1>{name}</h1>
                {isInstructor &&
                <img src={pen} alt="Edit" onClick={() => setCustomizeDiv(true)}/>
                }
                <img src={info} alt="Info" onClick={()=> setClassInfoDiv(true)} style={{marginLeft:'5px'}}/>
            </div>
            {courseCode &&
            <div className='class-code'>
                <h5>Course Code:</h5>
                <p>{courseCode}</p>
            </div>
            }
            {description &&
            <div>
                <h5>Description:</h5>
                <p>{description}</p>
            </div>
            }

            <div className="people-num">
                <div>
                    <img src={teacher} alt="Instructor" />
                    <p>{instructors.length}</p>
                </div>
                <div>
                    <img src={student} alt="Student" />
                    <p>{students.length}</p>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default ClassInfo;