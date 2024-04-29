import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import Title from "./Title";

const Notifications = () => {
    const userId = localStorage.getItem("userId");

    const [invitations, setInvitations] = useState([]);

    const handleDate = (date) => {
        return moment(date).fromNow()
    }

    const getInvitations = async() => {
        const res = await axios.get(`http://localhost:4000/invite/get/${userId}`).catch(err=>console.log(err))
        const data = await res.data.invitations;
        return data;
    }

    useEffect(()=>{ 
        getInvitations()
        .then((data)=>{
            setInvitations(data)
        })
    },[])

    return ( 
        <main>
        <div className="content">
            <Title propTitle={"Notifications"}/>

            {invitations ? (
                invitations.map((invitation, index) => (

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
                                <button className="danger">Reject</button>
                                <button>Accept</button>
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