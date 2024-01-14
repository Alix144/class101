import { useState } from "react";
import Title from "./Title";

import search from '../images/search.png'
import teacher from '../images/teacher.png'
import student from '../images/student.png'

const People = () => {
    const [query, setQuery] = useState("");
    const [query2, setQuery2] = useState("");

    const ppl = [
        {
        id: '1',
        name: 'ali',
        email: 'ali@gmail.com'
        },
        {
        id: '2',
        name: 'nagham',
        email: 'nagham@gmail.com'
        },
        {
        id: '3',
        name: 'rawan',
        email: 'rawan@gmail.com'
        },
    ]

    return ( 
        <div className="content">
            <Title propTitle={"Instructors"} add={"add-instructors"}/>
            <div className="people-parent-div">
                <div className="ppl-search">
                    <img src={search} alt="Search" />
                    <input type="text" name="" id="" onChange={e=>setQuery2(e.target.value)}/>

                    <div>
                        <img src={teacher} alt="Instructor" />
                        <p>1</p>
                    </div>
                </div>

                <div className="people">
                    {ppl.filter(user=>user.name.toLowerCase().includes(query2)).map((user)=>(

                    <div className="one-ppl" key={user.id}>
                        <div className="left-border"></div>
                        <div className="info">
                            <div className="profile-pic">{user.name.charAt(0).toUpperCase()}</div>
                            <h4>{user.name}</h4>
                        </div>
                        <p>{user.email}</p>
                    </div>

                    ))}
                </div>

                <hr className="hr"/>
            </div>

            <Title propTitle={"Students"} add={"add-student"}/>
            <div className="people-parent-div">
                <div className="ppl-search">
                    <img src={search} alt="Search" />
                    <input type="text" name="" id="" onChange={e=>setQuery(e.target.value)}/>

                    <div>
                        <img src={student} alt="Instructor" />
                        <p>203</p>
                    </div>
                </div>

                <div className="people">
                    {ppl.filter(user=>user.name.toLowerCase().includes(query)).map((user)=>(

                    <div className="one-ppl" key={user.id}>
                        <div className="left-border"></div>
                        <div className="info">
                            <div className="profile-pic">{user.name.charAt(0).toUpperCase()}</div>
                            <h4>{user.name.charAt(0).toUpperCase()+user.name.slice(1)}</h4>
                        </div>
                        <p>{user.email}</p>
                    </div>

                    ))}
                </div>

                <hr className="hr"/>
            </div>
        </div>
     );
}
 
export default People;