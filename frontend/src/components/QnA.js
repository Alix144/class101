import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import Title from "./Title";

const QnA = () => {
    const id = useParams().id
    const userId = localStorage.getItem("userId");
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({name:"?"});

    const handleDate = (date) => {
        return moment(date).fromNow()
    }

    const fetchUserDetails = async() => {
        const res = await axios.get(`http://localhost:4000/user/${userId}`).catch(err=>console.log(err))
        const data = await res.data.user;
        return data;
    }

    useEffect(()=>{ 
        fetchUserDetails()
        .then((data)=>{
            setUser(data)
        })
    }, [id])

    const fetchDetails = async() => {
        const res = await axios.get("http://localhost:4000/post/").catch(err=>console.log(err))
        const data = await res.data;
        return data;
    }

    useEffect(()=>{ 
        fetchDetails()
        .then((data)=>{
            setPosts(data.posts)
        })
    },[id])

    useEffect(() => {
        console.log(user)
    }, [posts, user]);

    return ( 
        <div className="content">
            <Title propTitle={"Q&A"}/>

            <div className="qna">

                <div className="q-input">
                    {user &&
                    <div className="q-img">{user.name[0].toUpperCase()}</div>
                    }
                    <input type="text" placeholder="Add Question"/>
                    <button>Submit</button>
                </div>

                {/* <div className="qna-post">
                    <div className="question-div">
                        <div className="info">
                            <div className="a-img">A</div>
                            <div>
                                <h4>Ali Youssef</h4>
                                <p>20-03-2023</p>
                            </div>
                        </div>
                        <div className="question">
                            <p>Lorem. Inventore nemo cumklsa  sadlf jsldkf sque harum deserunt,uptas asperiores tenetur?</p>
                        </div>
                        <hr />
                    </div>
                    <div className="answer">
                        <div className="a-img">A</div>
                        <input type="text" placeholder="Answer"/>
                        <button>Answer</button>
                    </div>

                    <div className="comments">
                        <div className="comment">
                            <div className="info">
                                <div className="a-img">A</div>
                                <div>
                                    <h4>Ali Youssef</h4>
                                    <p>20-03-2023</p>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum quisquam error minus laudantium est blanditiis magnam itaque aspernatur nobis dignissimos, quibusdam asperiores maxime velit sit quos, perferendis odio non ab!</p>
                        </div>
                    </div>
                    <hr className="hr"/>
                </div> */}


                {posts.slice().reverse().map((post, index)=>
                        
                post.class === id &&
                <div className="qna-post" key={index}>
                    <div className="question-div">
                        <div className="info">
                            <div className="a-img">{post.user.name[0].toUpperCase()}</div>
                            <div>
                                <h4>{post.user.name}</h4>
                                <p>{handleDate(post.date)}</p>
                            </div>
                        </div>
                        <div className="question">
                            <p>{post.question}</p>
                        </div>
                        <hr />
                    </div>
                    <div className="answer">
                        <div className="a-img">{user.name[0].toUpperCase()}</div>
                        <input type="text" placeholder="Answer"/>
                        <button>Answer</button>
                    </div>

                    <div className="comments">
                        <div className="comment">
                            <div className="info">
                                <div className="a-img">A</div>
                                <div>
                                    <h4>Ali Youssef</h4>
                                    <p>20-03-2023</p>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum quisquam error minus laudantium est blanditiis magnam itaque aspernatur nobis dignissimos, quibusdam asperiores maxime velit sit quos, perferendis odio non ab!</p>
                        </div>
                    </div>
                    <hr className="hr"/>
                </div>
                
                
                )}

            </div>
        </div>
     );
}
 
export default QnA;