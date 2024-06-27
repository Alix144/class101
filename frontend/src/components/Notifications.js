import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setToInstructor, setToStudent } from '../store/slices/instructorOrStudent';

import axios from "axios";
import moment from "moment";

import Title from "./Title";

const Notifications = () => {
    const link = "https://class101-api.onrender.com"
    const localLink = "http://localhost:4000"

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const userId = localStorage.getItem("userId");

    const [invitations, setInvitations] = useState([]);

    const handleDate = (date) => {
        return moment(date).fromNow()
    }

    const getInvitations = async() => {
        const res = await axios.get(`${link}/invite/get/${userId}`).catch(err=>console.log(err))
        const data = await res.data.invitations;
        return data;
    }

    useEffect(()=>{ 
        getInvitations()
        .then((data)=>{
            setInvitations(data)
        })
    },[])

    // accept class invitation

    const acceptToBeInstructor = async(classId) => {
        const res = await axios.put(`${link}/class/join/instructor/${userId}`, {
            classId,
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const acceptToBeStudent = async(classId) => {
        const res = await axios.put(`${link}/class/join/student/${userId}`, {
            classId,
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const acceptClassInvitation = (e, invitationId, classId, asInstructor) => {
        e.preventDefault()
        if(asInstructor){
            acceptToBeInstructor(classId).then((data) => {
                handleRejectInvitation(e, invitationId)
                dispatch(setToInstructor())
                navigate(`/dashboard/classroom/${data.existingClass._id}/home`);
               
            });
        }
        else{
            acceptToBeStudent(classId).then((data) => {
                handleRejectInvitation(e, invitationId)
                dispatch(setToStudent())
                navigate(`/dashboard/classroom/${data.existingClass._id}/home`);
            });
        }
        
    }

    // deleting invitation

    const rejectInvitation = async(invitationId) => {
        const res = await axios.delete(`${link}/invite/delete/${invitationId}`)
        .catch(err=>console.log(err));
        const data = await res.data;
        return data;
    }

    const handleRejectInvitation = (e, invitationId) => {
        e.preventDefault()
        rejectInvitation(invitationId).then((data) => {
            window.location.reload();
        });
    }

    return ( 
        <main>
        <div className="content">
            <Title propTitle={"Notifications"}/>

            {invitations ? (
                invitations.slice().reverse().map((invitation, index) => (

                    <div className="qna-post notification-details">
                        <div className="question-div">
                            <div className="info">
                                <div className="a-img" style={{backgroundColor: `${invitation.color}`}}>{invitation.from.name && invitation.from.name[0].toUpperCase()}</div>
                                <div>
                                    <h4>{invitation.from.name} {invitation.from.surname}</h4>
                                    <p>{handleDate(invitation.date)}</p>
                                </div>
                            </div>
                            <div className="question">
                                <p><b>{invitation.from.name} {invitation.from.surname}</b> invited you to <b>{invitation.class.name}</b> class {invitation.asInstructor ? " to be an instructor": ""}.</p>
                            </div>
                            <hr />
                            <div className="on-page-btns">
                                <button className="danger" onClick={(e)=>handleRejectInvitation(e, invitation._id)}>Reject</button>
                                {invitation.asInstructor ?
                                    <button onClick={(e)=>acceptClassInvitation(e, invitation._id, invitation.class._id, true)}>Accept</button>
                                :
                                    <button onClick={(e)=>acceptClassInvitation(e, invitation._id, invitation.class._id, false)}>Accept</button>
                                }
                            </div>

                        </div>
                        <hr className="hr"/>
                    </div>
                    
                ))
            ) : (
                        <h1>No notifications</h1>
            )}

        </div>
        </main>
     );
}
 
export default Notifications;