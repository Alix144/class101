import axios from "axios";
import { useEffect, useState } from "react";

import ClassBox from "./ClassBox";

const ClassesContainer = ({type}) => {
    const link = "https://class101-api.onrender.com"
    const localLink = "http://localhost:4000"

    const id = localStorage.getItem("userId");
    const [classes, setClasses] = useState();

    const sendRequest = async() => {
        const res = await axios.get(`${link}/class/view/${id}`).catch(err=>console.log(err))
        const data = await res.data.classes
        console.log(data)
        return data;
    }

    useEffect(() => {
        sendRequest().then(data=>setClasses(data))
    },[])

    return ( 
        <div className="classes-container">
            {classes && classes.map((klass, index)=>{
                if (type==="teaching" && klass.instructors.includes(id))
                    return <ClassBox key={klass._id} id={klass._id} color={klass.classColor} img={klass.background} className={klass.name} instructorsNum={klass.instructors.length} studentsNum={klass.students.length} type={"teacher"} />
                else if(type==="learning" && klass.students.includes(id)){
                    return <ClassBox key={klass._id} id={klass._id} color={klass.classColor} img={klass.background} className={klass.name} instructorsNum={klass.instructors.length} studentsNum={klass.students.length} type={"student"} />
                }
            })}
            {/* <AddBox/> */}
        </div>
     );
}
 
export default ClassesContainer;