import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import axios from "axios";

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

const ClassInfo = ({name, courseCode, description, visibility, bg, classColor, instructors, students}) => {
    const link = "https://class101-api.onrender.com"
    const localLink = "http://localhost:4000"

    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)

    const id = useParams().id;
    const [isCustomizeDivOpen, setCustomizeDiv] = useState(false)
    const [isClassInfoOpen, setClassInfoDiv] = useState(false)

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedBg, setSelectedBg] = useState("bg1");
    const [uploadedImage, setUploadedImage] = useState(null);

    const [isForeignImg, setForeignImg] = useState(false);

    const [selectedColor, setSelectedColor] = useState(classColor);

    const [newName, setName] = useState("");
    const [newCourseCode, setCourseCode] = useState("");
    const [newDescription, setDescription] = useState("");
    const [newMaxStudents, setMaxStudents] = useState("");

    const [newVisibility, setVisibility] = useState("");

    
    const handleColorClick = (color) => {
        setSelectedColor(color)
    }

    const handleClick = (index) => {
        setSelectedBg(index)
        setUploadedImage(index)
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]; 
        console.log(file)
        setUploadedImage(file)
        setSelectedBg("bg9")
    };

    //class info

        //update
        const update = async() => {
            const res = await axios.put(`${link}/class/edit/${id}`,{
                name: newName,
                courseCode: newCourseCode,
                description: newDescription,
                visibility: newVisibility,
            }).catch(err=>console.log(err))
            const data = await res.data;
            console.log(data)
            return data;
        }
    
        const handleUpdate = (e) => {
            e.preventDefault()
            update()
            .then(() => {
                alert("Updated Successfully");
                window.location.reload();
            })
            .catch(err => console.log(err));
        }

        //customize
        const customize = async() => {
            const formData = new FormData();

            if (uploadedImage instanceof File) {
                formData.append("file", uploadedImage);
                formData.append("classColor", selectedColor);
              } else if (typeof uploadedImage === "string") {
                // If uploadedImage is a string, append it as a string parameter
                formData.append("stringParam", uploadedImage);
                formData.append("classColor", selectedColor);
              }

        
            const res = await axios.put(`${link}/class/addBg/${id}`, formData)
            .catch(err=>console.log(err));
            const data = await res.data;
            console.log(data)
            return data;
        }
    
        const handleCustomize = (e) => {
            e.preventDefault()
            customize()
            .then(() => {
                alert("customized Successfully");
                window.location.reload();
            })
            .catch(err => console.log(err));
        }

        const closeCustomize = (e) => {
            setCustomizeDiv(false)
            setSelectedColor(classColor)
            if(bg === "bg1"){
                setSelectedImage(bg1)
                setSelectedBg("bg1")
                setForeignImg(false)
            }
            else if(bg === "bg2"){
                setSelectedImage(bg2)
                setSelectedBg("bg2")
                setForeignImg(false)
            }
            else if(bg === "bg3"){
                setSelectedImage(bg3)
                setSelectedBg("bg3")
                setForeignImg(false)
            }
            else if(bg === "bg4"){
                setSelectedImage(bg4)
                setSelectedBg("bg4")
                setForeignImg(false)
            }
            else if(bg === "bg5"){
                setSelectedImage(bg5)
                setSelectedBg("bg5")
                setForeignImg(false)
            }
            else if(bg === "bg6"){
                setSelectedImage(bg6)
                setSelectedBg("bg6")
                setForeignImg(false)
            }
            else if(bg === "bg7"){
                setSelectedImage(bg7)
                setSelectedBg("bg7")
                setForeignImg(false)
            }
            else if(bg === "bg8"){
                setSelectedImage(bg8)
                setSelectedBg("bg8")
                setForeignImg(false)
            }
            else{
                setSelectedImage(bg)
                setSelectedBg("bg9")
                setUploadedImage(bg)
                setForeignImg(true)
            }
        }

    const openClassColors = () => {
        setCustomizeDiv(true)
    }

    const openClassInfo = () => {
        setClassInfoDiv(true)
    }

    useEffect(() => {
        setName(name)
        setCourseCode(courseCode)
        setDescription(description)
        setVisibility(visibility)   
        setSelectedColor(classColor)
    }, [name, courseCode, classColor, id])

    useEffect(() => {
        if(bg === "bg1"){
            setSelectedImage(bg1)
            setSelectedBg("bg1")
            setUploadedImage("bg1")
            setForeignImg(false)
        }
        else if(bg === "bg2"){
            setSelectedImage(bg2)
            setSelectedBg("bg2")
            setUploadedImage("bg2")
            setForeignImg(false)
        }
        else if(bg === "bg3"){
            setSelectedImage(bg3)
            setSelectedBg("bg3")
            setUploadedImage("bg3")
            setForeignImg(false)
        }
        else if(bg === "bg4"){
            setSelectedImage(bg4)
            setSelectedBg("bg4")
            setUploadedImage("bg4")
            setForeignImg(false)
        }
        else if(bg === "bg5"){
            setSelectedImage(bg5)
            setSelectedBg("bg5")
            setUploadedImage("bg5")
            setForeignImg(false)
        }
        else if(bg === "bg6"){
            setSelectedImage(bg6)
            setSelectedBg("bg6")
            setUploadedImage("bg6")
            setForeignImg(false)
        }
        else if(bg === "bg7"){
            setSelectedImage(bg7)
            setSelectedBg("bg7")
            setUploadedImage("bg7")
            setForeignImg(false)
        }
        else if(bg === "bg8"){
            setSelectedImage(bg8)
            setSelectedBg("bg8")
            setUploadedImage("bg8")
            setForeignImg(false)
        }
        else{
            setSelectedImage(bg)
            setSelectedBg("bg9")
            setUploadedImage(bg)
            setForeignImg(true)
        }

        
    }, [bg])


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
                                {uploadedImage && uploadedImage instanceof File  ? (
                                    <div className='bg' style={{backgroundImage: `url(${URL.createObjectURL(uploadedImage)})`}} onClick={()=>handleClick("bg9")}> <div className={`${selectedBg === "bg9" ? 'selected-bg' : ''}`}> {selectedBg ==="bg9" && <img src={check} alt="check"/>} </div></div>
                                ) :
                                    <div className='bg'><img src={noImg} alt="No-Uploaded-Img" className='no-img'/></div>
                                }       
                                <label htmlFor="uploadBg" className='upload'> <img src={upload} alt="upload" /> Upload</label>
                                <input type="file" accept="image/*" id='uploadBg' className='upload' onChange={(e)=>handleImageChange(e)}/>                         
                            </div>
                            <label htmlFor="">Class Color</label>
                            <div className="colors" style={{ }}>
                                <div className="colors-container">
                                    <div className='circle-color' style={{backgroundColor: "#74BCFF"}} onClick={()=>handleColorClick("#74BCFF")}> {selectedColor ==="#74BCFF" && <img src={check} alt="check"/>} </div>
                                    <div className='circle-color' style={{backgroundColor: "#86FFAF"}} onClick={()=>handleColorClick("#86FFAF")}> {selectedColor ==="#86FFAF" && <img src={check} alt="check"/>} </div>
                                    <div className='circle-color' style={{backgroundColor: "#B63EFF"}} onClick={()=>handleColorClick("#B63EFF")}> {selectedColor ==="#B63EFF" && <img src={check} alt="check"/>} </div>
                                    <div className='circle-color' style={{backgroundColor: "#FF6464"}} onClick={()=>handleColorClick("#FF6464")}> {selectedColor ==="#FF6464" && <img src={check} alt="check"/>} </div>
                                    <div className='circle-color' style={{backgroundColor: "#FFD15A"}} onClick={()=>handleColorClick("#FFD15A")}> {selectedColor ==="#FFD15A" && <img src={check} alt="check"/>} </div>
                                </div>
                            </div>
                    </form>
                    <div className="on-page-btns">
                        <button onClick={()=>closeCustomize()}>close</button>
                        <button onClick={(e)=>handleCustomize(e)}>Save</button>
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
                            {isInstructor ?
                                <input type="text" value={newName} onChange={(e)=>setName(e.target.value)}/>
                                :
                                <input type="text" value={newName} readOnly/>
                            }
                            
                        </div>
                        <div>
                            <label htmlFor="code">Course Code</label>
                            {isInstructor ?
                                <input type="text" id="code" name="code" value={newCourseCode} onChange={(e)=>setCourseCode(e.target.value)}/>
                                :
                                <input type="text" id="code" name="code" value={newCourseCode} readOnly/>
                            }
                            
                        </div>
                        <div>
                            <label htmlFor="desc">Description</label>
                            {isInstructor ?
                                <textarea name="desc" id="desc"  rows="5" value={newDescription} onChange={(e)=>setDescription(e.target.value)}></textarea>
                                :
                                <textarea name="desc" id="desc"  rows="5" value={newDescription} readOnly></textarea>
                            }
                        </div>
                        <div>
                            <label htmlFor="max">Visibility</label>
                            {isInstructor?
                                <select id="visibility" name="visibility" value={newVisibility} onChange={(e)=>setVisibility(e.target.value)}>
                                    <option value={"public"}>Public</option>
                                    <option value={"private"}>Private</option>
                                </select>
                                :
                                <select id="visibility" name="visibility" value={newVisibility} readOnly>
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            }
                        </div>
                    </form>
                    <div className="on-page-btns">
                        <button onClick={()=>setClassInfoDiv(!isClassInfoOpen)}>Close</button>
                        {isInstructor &&
                        <button onClick={(e)=>handleUpdate(e)}>Edit</button>
                        }
                    </div>
                </div>
            </div>
        }


        <div className="class-info" >
            {isForeignImg ?  <img src={require(`../uploaded-imgs/${selectedImage}`)} id='foreign' alt="hha" />
            :
            <img src={selectedImage} id='foreign' alt="background-img" />
            }
            <div className='class-name-pic'>
                <div className='default-pic' style={{backgroundColor: classColor}}>{name[0].toUpperCase()}</div>
                <h1>{name}</h1>
                {isInstructor &&
                <img src={pen} alt="Edit" onClick={() => openClassColors()}/>
                }
                <img src={info} alt="Info" onClick={()=> openClassInfo()} style={{ marginLeft: '5px', backgroundColor: '#ffffff79' }}
/>
            </div>
            {courseCode &&
            <div className='class-code'>
                <h5>Course Code:</h5>
                <p>{courseCode}</p>
            </div>
            }
            {description &&
            <div className='board2-description'>
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