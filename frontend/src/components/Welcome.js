import { useState } from 'react';
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

const Welcome = () => {
    const [isCustomizeDivOpen, setCustomizeDiv] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        
        // Do further processing if needed, e.g., validation, resizing, etc.
    
        setSelectedImage(file);
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
                                <div style={{backgroundImage: `url(${bg1})`}}></div>
                                <div style={{backgroundImage: `url(${bg2})`}}></div>
                                <div style={{backgroundImage: `url(${bg3})`}}></div>
                                <div style={{backgroundImage: `url(${bg4})`}}></div>
                                <div style={{backgroundImage: `url(${bg5})`}}></div>
                                <div style={{backgroundImage: `url(${bg6})`}}></div>
                                <div style={{backgroundImage: `url(${bg7})`}}></div>
                                <div style={{backgroundImage: `url(${bg8})`}}></div>
                                {selectedImage ? (
                                <div style={{backgroundImage: `url(${URL.createObjectURL(selectedImage)})`}}></div>
                                ) :
                                <div><img src={noImg} alt="No-Uploaded-Img" className='no-img'/></div>
                                }       
                                <input type="file" accept="image/*"  className='upload' onChange={handleImageChange}/>                         
                            </div>
                    </form>
                    <div className="on-page-btns">
                        <button onClick={()=>setCustomizeDiv(false)}>close</button>
                        <button>Save</button>
                    </div>
                </div>
            </div>
        }

            <div className="welcome">
                <h1>Welcome Back Ali!</h1>
                <img src={pen} alt="Edit" onClick={() => setCustomizeDiv(true)}/>
            </div>
            
        </>
     );
}
 
export default Welcome;