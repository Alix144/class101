
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

import { setToClassT, setToClassS } from '../store/slices/currentSection';
import { setToInstructor, setToStudent } from '../store/slices/instructorOrStudent';
import { setToDashboard } from '../store/slices/currentClassPage';


import ProfileImg from './ProfileImg'

import student from '../images/student.png'
import teacher from '../images/teacher.png'

import bg1 from '../images/classBgs/bg1.jpg'
import bg2 from '../images/classBgs/bg2.jpg'
import bg3 from '../images/classBgs/bg3.jpg'
import bg4 from '../images/classBgs/bg4.jpg'
import bg5 from '../images/classBgs/bg5.jpg'
import bg6 from '../images/classBgs/bg6.jpg'
import bg7 from '../images/classBgs/bg7.jpg'
import bg8 from '../images/classBgs/bg8.jpg'
import bg9 from '../images/classBgs/bg9.jpg'

import { motion } from "framer-motion";
const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

const ClassBox = ( {id, color, img, className, instructorsNum, studentsNum, type}) => {
    let primaryColor;
    let secondColor;
    let picColor;

    let bg;

    if(color === "#FF6464"){
        primaryColor = "#FF6161"
        secondColor = "#D10F0F"
        picColor = "#FFC0C0"

    }else if(color === "#B63EFF"){
        primaryColor = "#D650F8"
        secondColor = "#A024AB"
        picColor = "#E6AFFF"
    }
    else if(color === "#86FFAF"){
        primaryColor = "#86FFAF"
        secondColor = "#15B84D"
        picColor = "#DDFFE9"
    }
    else if(color === "#FFD15A"){
        primaryColor = "#FFD15A"
        secondColor = "#E3A609"
        picColor = "#FFEAB5"
    }else{
        primaryColor = "#74BCFF"
        secondColor = "#282DA4"
        picColor = "#C2DEFF"
    }

    if(img === "bg1"){
        bg = bg1;
    }else if(img === "bg2"){
        bg = bg2;
    }else if(img === "bg3"){
        bg = bg3;
    }else if(img === "bg4"){
        bg = bg4;
    }else if(img === "bg5"){
        bg = bg5;
    }else if(img === "bg6"){
        bg = bg6;
    }else if(img === "bg7"){
        bg = bg7;
    }else if(img === "bg8"){
        bg = bg8;
    }else{
        bg = bg9;
    }

    
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const goToClassroom = (id) => {
        navigate(`/dashboard/classroom/${id}/home`)
        dispatch(setToDashboard())

        if(type === "teacher"){
            dispatch(setToInstructor())
            dispatch(setToClassT())
            localStorage.setItem('currentSection', 'classT');
        }
        else{
            dispatch(setToStudent())
            dispatch(setToClassS())
            localStorage.setItem('currentSection', 'classS');
        }
    }

    return ( 
        <motion.div className="class-box" style={{backgroundColor: (primaryColor)}}
        variants={container}
        initial="hidden"
        animate="visible"
        onClick={()=>goToClassroom(id)}
        >
            <div className="class-img" style={{backgroundImage: `url(${bg})`}}>
                <div className="img-overlay" style={{backgroundImage: `linear-gradient(${secondColor}, ${primaryColor})`}}></div>
                <ProfileImg picColor={picColor} className={className}/>
            </div>
            <div className="class-box-info">
                <div>
                    <h4>{className}</h4>
                    <p><b>Instructor:</b></p>
                    <p>-</p>
                </div>
                <div className='info-part2'>
                    <div>
                        <img src={teacher} alt="Teacher" />
                        <p>{instructorsNum}</p>
                    </div>
                    <div>
                        <img src={student} alt="Student" />
                        <p>{studentsNum}</p>
                    </div>
                </div>


            </div>


        </motion.div>
     );
}
 
export default ClassBox;