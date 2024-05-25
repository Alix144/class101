import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import moment from "moment";

import Title from "./Title";

import trash from '../images/trash-can.png'
import edit from '../images/pencil.png'
import emptyBox from '../images/empty-box.png'

const Announcements = () => {
    const id = useParams().id
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)
    const [announcements, setAnnouncements] = useState()
    const [isEmpty, setIsEmpty] = useState(true)

    const sendRequest = async() => {
        const res = await axios.get("http://localhost:4000/announcement").catch(err=>console.log(err))
        const data = await res.data.announcements
        setIsEmpty(data.filter(announcement => announcement.class === id).length === 0);
        return data;
    }

    useEffect(() => {
        sendRequest().then(data=>setAnnouncements(data))
    },[id])

    //delete
    const deleteTask = async(id) => {
        const res = await axios.delete(`http://localhost:4000/announcement/delete/${id}`)
        .catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }
    
    const handleDelete = (e, id) => {
        e.preventDefault()
        deleteTask(id).then(() => {
        window.location.reload();
        });
    }

    const handleDate = (date) => {
        return moment(date).fromNow()
    }
        
    return ( 
        <div className="content announcements">
            {isInstructor ?
                <Title propTitle={"Announcements"} add={"announcements"}/>
                :
                <Title propTitle={"Announcements"}/>
            }

            {announcements && announcements.slice().reverse().map((announcement, index)=>{
                if(id === announcement.class){
                    return(
                        <div className="announcement-box" key={index}>
                            <div className="left-border"></div>
                            <div className="info">
                                <div className="profile-pic" style={{backgroundColor: `${announcement.user.color}`}}>{announcement.user.name[0].toUpperCase()}</div>
                                <div>
                                    <h4>{announcement.title}</h4>
                                    <p>{announcement.user.name}</p>
                                </div>
                            </div>
                            <div className="announcement-text">
                                <p>{announcement.description}</p>
                            </div>
                            <p className="date">{handleDate(announcement.date)}</p>
                            {isInstructor &&
                            <div className="update-delete">
                                <img src={trash} alt="Delete" onClick={(e)=>handleDelete(e, announcement._id)}/>
                            </div>
                            }
                        </div>
                    )}
            })}

            {isEmpty && 
                <div className="div-content">
                <img src={emptyBox} alt="Empty-box" />
                <p>This is were you can see your 
                    instructor’s announcements</p>
            </div>
            }

        </div>
     );
}
 
export default Announcements;