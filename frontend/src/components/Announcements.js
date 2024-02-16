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
                                <div className="profile-pic">{announcement.user.name[0].toUpperCase()}</div>
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
                                <img src={edit} alt="" />
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

            {/* <div className="announcement-box">
                <div className="left-border"></div>
                <div className="info">
                    <div className="profile-pic">S</div>
                    <div>
                        <h4>Starting Date</h4>
                        <p>Sara Nur</p>
                    </div>
                </div>
                <div className="announcement-text">
                    <p>Lorem ipsum dolor, sit Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta error, laborum incidunt quisquam fugit non fugiat nulla inventore, magni reprehenderit, eos laudantium! Laboriosam error hic doloremque harum, quod ea sint! amet consectetur adipisicing elit. Possimus br neque, culpa enim nesciunt nisi vero. Omnis nisi ex amet consequuntur sint fuga nobis magnam, aut corrupti esse?</p>
                </div>
                <p className="date">20-03-2023</p>

                {isInstructor &&
                <div className="update-delete">
                    <img src={trash} alt="Delete" />
                    <img src={edit} alt="" />
                </div>
                }

            </div> */}

        </div>
     );
}
 
export default Announcements;