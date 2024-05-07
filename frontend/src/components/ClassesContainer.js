import axios from "axios";
import { useEffect, useState } from "react";

import ClassBox from "./ClassBox";
import AddBox from "./AddBox";

import bg1 from '../images/classBgs/bg1.jpg'
import bg2 from '../images/classBgs/bg2.jpg'
import bg3 from '../images/classBgs/bg3.jpg'
import bg4 from '../images/classBgs/bg4.jpg'
import bg5 from '../images/classBgs/bg5.jpg'
import bg6 from '../images/classBgs/bg6.jpg'
import bg7 from '../images/classBgs/bg7.jpg'
import bg8 from '../images/classBgs/bg8.jpg'
import bg9 from '../images/classBgs/bg9.jpg'

const ClassesContainer = ({type}) => {

    const id = localStorage.getItem("userId");
    const [classes, setClasses] = useState();

    const sendRequest = async() => {
        const res = await axios.get(`http://localhost:4000/class/view/${id}`).catch(err=>console.log(err))
        const data = await res.data.classes
        return data;
    }

    useEffect(() => {
        sendRequest().then(data=>setClasses(data))
    },[])

    return ( 
        <div className="classes-container">
            {classes && classes.map((klass, index)=>{
                if (type==="teaching" && klass.instructors.includes(id))
                    return <ClassBox key={klass._id} id={klass._id} color={klass.classColor} img={bg1} className={klass.name} instructorsNum={klass.instructors.length} studentsNum={klass.students.length} type={"teacher"} />
                else if(type==="learning" && klass.students.includes(id)){
                    return <ClassBox key={klass._id} id={klass._id} color={klass.classColor} img={bg1} className={klass.name} instructorsNum={klass.instructors.length} studentsNum={klass.students.length} type={"student"} />
                }
            })}
            {/* <AddBox/> */}
        </div>
     );
}
 
export default ClassesContainer;