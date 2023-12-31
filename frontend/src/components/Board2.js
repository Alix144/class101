import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { setToDashboard, setToAnnouncements, setToChat, setToAssignments, setToQnA, setToSyllabus, setToDocuments, setToPeople } from '../store/slices/currentClassPage';

import ClassInfo from "./ClassInfo";

const Board = () => {
    const navigate = useNavigate();

    const currentClassPage = useSelector((state) => state.currentClassPage.value)
    const dispatch = useDispatch()

    const home = () =>{
        navigate('home')
        dispatch(setToDashboard())
    }
    const announcements = () =>{
        navigate('announcements')
        dispatch(setToAnnouncements())
    }
    const chat = () =>{
        navigate('chat')
        dispatch(setToChat())
    }
    const assignments = () =>{
        navigate('assignments')
        dispatch(setToAssignments())
    }
    const QnA = () =>{
        navigate('QnA')
        dispatch(setToQnA())
    }
    const syllabus = () =>{
        navigate('syllabus')
        dispatch(setToSyllabus())
    }
    const documents = () =>{
        navigate('documents')
        dispatch(setToDocuments())
    }
    const people = () =>{
        navigate('people')
        dispatch(setToPeople())
    }

    useEffect(() => {
        dispatch(setToDashboard())
    }, []);

    useEffect(() => {
        console.log("********")
        console.log(currentClassPage);
    }, [currentClassPage]);

    return ( 
        <div className="board2">
            <ClassInfo/>
            <div className="nav">
                <div className={`${currentClassPage === "dashboard" && "current-page"}`} onClick={home}>Dashboard</div>
                <div className={`${currentClassPage === "announcements" && "current-page"}`} onClick={announcements}>Announcements</div>
                <div className={`${currentClassPage === "chat" && "current-page"}`} onClick={chat}>Chat</div>
                <div className={`${currentClassPage === "assignments" && "current-page"}`} onClick={assignments}>Assignments</div>
                <div className={`${currentClassPage === "QnA" && "current-page"}`} onClick={QnA}>Q&A</div>
                <div className={`${currentClassPage === "syllabus" && "current-page"}`} onClick={syllabus}>Syllabus</div>
                <div className={`${currentClassPage === "documents" && "current-page"}`} onClick={documents}>Documents</div>
                <div className={`${currentClassPage === "people" && "current-page"}`} onClick={people}>People</div>
            </div>
        </div>
     );
}
 
export default Board;