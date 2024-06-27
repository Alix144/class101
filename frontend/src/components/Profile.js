import React, { useState, useEffect } from 'react';
import axios from "axios";

import ClassesContainer from "./ClassesContainer";
import Title from "./Title";

import classroom from '../images/classroom.png'

const Profile = () => {
    const link = "https://class101-api.onrender.com"
    const localLink = "http://localhost:4000"
    
    const userId = localStorage.getItem('userId')

    const [user, setUser] = useState(null)

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState("#74BCFF")


    const updateUser = async() => {
        const res = await axios.put(`${link}/user/update`,{
            userId,
            name,
            surname,
            email,
            description,
        }).catch(err=>console.log(err))
        const data = await res.data;
        return data;
    }

    const handleUpdateUser = (e) => {
        e.preventDefault()
        updateUser()
        .then(() => {
            alert("Updated Successfully");
            window.location.reload();
        })
        .catch(err => console.log(err));
    }


    const fetchDetails = async() => {
        const res = await axios.get(`${link}/user/${userId}`).catch(err=>console.log(err))
        const data = await res.data.user;
        console.log(data)
        return data;
    }

    useEffect(()=>{ 
        fetchDetails()
        .then((data)=>{
            setUser(data)
            console.log()
            setName(data.name)
            setSurname(data.surname)
            setEmail(data.email)
            setDescription(data.description)
            setColor(data.color)
        })

        
    },[userId])

    return (       
        <main>
            <div className="content">
                <Title propTitle={"Profile"}/>
                <div className="profile-divs">
                    <div className="profile-div1">
                        <div className="profile-div1-1">
                            <div className="div1">
                            <div className="profile-div-pic" style={{backgroundColor: `${color}`}} ><h1>{user && user.name}</h1></div>
                            <h3>{user && user.name} {user && user.surname}</h3>
                            </div>
                            <div className="div2">
                            <h4>Description</h4>
                            {user && user.description ? <p>{user.description}</p> : <p>-</p>}
                            
                            </div>
                            <div className="classroom">
                            <img src={classroom} alt="Class-room" />
                            <h4>Classes:</h4>
                            <p>{user && user.classes.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile-div2">
                        <div className="account-details">
                            <h4>Profile Details</h4>
                            <hr />
                        </div>

                        <form action="">
                            <div className="full-name">
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor="surname">Surname</label>
                                    <input type="text" name="surname" id="surname" value={surname} onChange={(e)=>setSurname(e.target.value)}/>
                                </div>
                            </div>

                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="description">
                                <label htmlFor="desc">Description</label>
                                <textarea name="desc" id="desc" cols="30" rows="6" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                            </div>
                            <button className="save" onClick={(e)=>handleUpdateUser(e)}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
 
     );
}
 
export default Profile;