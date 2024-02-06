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
        console.log(data)
        return data;
    }

    useEffect(() => {
        sendRequest().then(data=>setClasses(data))
    },[])

    return ( 
        <div className="classes-container">
            {/* <ClassBox color={"blue"} img={bg9}/>
            <ClassBox color={"purple"} img={bg8}/>
            <ClassBox color={"yellow"} img={bg4}/>
            <ClassBox color={"red"} img={bg2}/>
            <ClassBox color={"green"} img={bg3}/>
            <ClassBox color={"green"} img={bg5}/>
            <ClassBox color={"blue"} img={bg1}/> */}

            {classes && classes.map((klass, index)=>{
                console.log(klass)
                if (type==="teaching" && klass.instructors.includes(id))
                    return <ClassBox key={index} id={klass._id} color={klass.color} img={bg1} className={klass.name} instructorsNum={klass.instructors.length} studentsNum={klass.students.length}/>
                else if(type==="learning" && klass.students.includes(id)){
                    return <ClassBox key={index} id={klass._id} color={klass.color} img={bg1} className={klass.name} instructorsNum={klass.instructors.length} studentsNum={klass.students.length}/>
                }
            })}
            <AddBox/>
        </div>
     );
}
 
export default ClassesContainer;