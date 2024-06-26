import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";

import Board2 from "./Board2";
import Title from "./Title";
import ClassroomHome from './ClassroomHome';

const Classroom = () => {
    const link = "https://class101-api.onrender.com"
    const localLink = "http://localhost:4000"

    const id = useParams().id

    const [klass, setKlass] = useState("");


    const fetchDetails = async() => {
        const res = await axios.get(`${link}/class/view/class/${id}`).catch(err=>console.log(err))
        const data = await res.data;
        return data;
    }

    useEffect(()=>{ 
        fetchDetails()
        .then((data)=>{
            setKlass(data.class)
        })
    },[id])

    return ( 
        <main className="classroom-main">
            {klass && 
            <>
            <Board2 name={klass.name} courseCode={klass.courseCode} invitationCode={klass.invitationCode} description={klass.description} visibility={klass.visibility} bg={klass.background} classColor={klass.classColor} instructors={klass.instructors} students={klass.students}/>
            <Outlet name={klass.name} courseCode={klass.courseCode} invitationCode={klass.invitationCode} description={klass.description} maxStudents={klass.maxStudents} bg={klass.background} classColor={klass.classColor} instructors={klass.instructors} students={klass.students}/>
            </>
            }
        </main>
     );
}
 
export default Classroom;