import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { setToDashboard, setToAnnouncements, setToChat, setToAssignments, setToQnA, setToSyllabus, setToDocuments, setToPeople } from '../store/slices/currentClassPage';

import ClassInfo from "./ClassInfo";

const Board = ({name, courseCode, invitationCode, description, maxStudents, bg, classColor, instructors, students}) => {
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
        const currentPage = localStorage.getItem('currentPage');
        if (currentPage) {
            if (currentPage === 'dashboard'){
                dispatch(setToDashboard())
            }else if(currentPage === 'announcements'){
                dispatch(setToAnnouncements())
            }else if(currentPage === 'chat'){
                dispatch(setToChat())
            }else if(currentPage === 'assignments'){
                dispatch(setToAssignments())
            }else if(currentPage === 'QnA'){
                dispatch(setToQnA())
            }else if(currentPage === 'syllabus'){
                dispatch(setToSyllabus())
            }else if(currentPage === 'documents'){
                dispatch(setToDocuments())
            }else if(currentPage === 'people'){
                dispatch(setToPeople())
            }
        }
    }, [dispatch]);

    return ( 
        <div className="board2">
            <ClassInfo name={name} courseCode={courseCode} invitationCode={invitationCode} description={description} maxStudents={maxStudents} bg={bg} classColor={classColor} instructors={instructors} students={students}/>
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