import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";

import Board2 from "./Board2";
import Title from "./Title";
import ClassroomHome from './ClassroomHome';

const Classroom = () => {
    const id = useParams().id

    const [klass, setKlass] = useState("");


    const fetchDetails = async() => {
        const res = await axios.get(`http://localhost:4000/class/view/class/${id}`).catch(err=>console.log(err))
        const data = await res.data;
        return data;
    }

    useEffect(()=>{ 
        fetchDetails()
        .then((data)=>{
            setKlass(data.class)
            console.log(klass)
        })
    },[])

    return ( 
        <main className="classroom-main">
            {klass && 
            <>
            <Board2 name={klass.name} courseCode={klass.courseCode} invitationCode={klass.invitationCode} description={klass.description} maxStudents={klass.maxStudents} classColor={klass.classColor} instructors={klass.instructors} students={klass.students}/>
            <Outlet name={klass.name} courseCode={klass.courseCode} invitationCode={klass.invitationCode} description={klass.description} maxStudents={klass.maxStudents} classColor={klass.classColor} instructors={klass.instructors} students={klass.students}/>
            </>
            }
        </main>
     );
}
 
export default Classroom;