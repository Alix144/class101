import { useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Title from "./Title";

import trash from '../images/trash-can.png'
import edit from '../images/pencil.png'

const Syllabus = () => {
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)

    const id = useParams().id
    const [syllabus, setSyllabus] = useState()

    const sendRequest = async() => {
        const res = await axios.get("http://localhost:4000/syllabus").catch(err=>console.log(err))
        const data = await res.data.syllabus
        return data;
    }

    useEffect(() => {
        sendRequest().then(data=>setSyllabus(data))
    },[id])

    useEffect(() => {
        console.log(syllabus)
        console.log(id)
    },[syllabus])

    return ( 
        <div className="content">
            {isInstructor ?
                <Title propTitle={"Syllabus"} add={"addSyllabus"}/>
                :
                <Title propTitle={"Syllabus"}/>
            }

            {syllabus && syllabus.map((sylla, index)=>{
                if(id === sylla.class){
                    return(
                    <div className="syllabus-box" key={index}>
                        <div className="left-border"></div>
                        <h3>Week {sylla.week}:</h3>
                        <div className="topics">
                            <ul>
                            {sylla.topics.map((topic, index)=>
                                <li key={index}>{topic.value}</li>
                            )}
                            </ul>
                        </div>
                        {isInstructor &&
                        <div className="update-delete">
                            <img src={trash} alt="Delete" />
                            <img src={edit} alt="" />
                        </div>
                        }
    
                    </div>)
                }
            })}



        </div>
     );
}
 
export default Syllabus;