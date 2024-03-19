import { useEffect, useState } from 'react';
import axios from "axios";

import pen from '../images/pen.png'
import { clearOnPageDiv, setOnPageDiv } from '../store/slices/onPageDivSlice';

import Title from "./Title";

import { useSelector, useDispatch } from 'react-redux'

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
import upload from '../images/upload.png'
import check from '../images/check.png'

const Welcome = () => {

    const userId = localStorage.getItem("userId");

    const [user, setUser] = useState("")
    const [isCustomizeDivOpen, setCustomizeDiv] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedBg, setSelectedBg] = useState("bg1");

    const handleClick = (index) => {
        setSelectedBg(index)
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];    
        setSelectedImage(file);
        setSelectedBg("bg9")
    };

    // user info
    const getUser = async() => {
        const res = await axios.get(`http://localhost:4000/user/${userId}`).catch(err=>console.log(err))
        const data = await res.data.user
        return data;
    }

    useEffect(() => {
        getUser().then(
        (data)=>{setUser(data) 
        console.log(data)})
    },[userId])

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
                    </form>
                    <div className="on-page-btns">
                        <button onClick={()=>setCustomizeDiv(false)}>Close</button>
                        <button>Save</button>
                    </div>
                </div>
            </div>
        }

            <div className="welcome">
                <h1>Welcome Back {user.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : ""}!</h1>
                <img src={pen} alt="Edit" onClick={() => setCustomizeDiv(true)}/>
            </div>
            
        </>
     );
}
 
export default Welcome;