
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

import { setToClassT, setToClassS } from '../store/slices/currentSection';
import { setToInstructor, setToStudent } from '../store/slices/instructorOrStudent';
import { setToDashboard } from '../store/slices/currentClassPage';


import ProfileImg from './ProfileImg'

import student from '../images/student.png'
import teacher from '../images/teacher.png'
import more from '../images/more.png'

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
            <div className="class-img" style={{backgroundImage: `url(${img})`}}>
                <div className="img-overlay" style={{backgroundImage: `linear-gradient(${secondColor}, ${primaryColor})`}}></div>
                <ProfileImg picColor={picColor} className={className}/>
            </div>
            <div className="class-box-info">
                <div>
                    <h4>{className}</h4>
                    <p><b>Instructor:</b></p>
                    <p>Person1</p>
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