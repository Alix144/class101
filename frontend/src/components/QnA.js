import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import Title from "./Title";

import leaf from '../images/leaf.png'

const QnA = () => {
    const link = "https://class101-api.onrender.com"
    const localLink = "http://localhost:4000"

    const id = useParams().id
    const userId = localStorage.getItem("userId");
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({name:"?"});
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState([]);
    
    const [error, setError] = useState("");

    const handleDate = (date) => {
        return moment(date).fromNow()
    }

    const fetchUserDetails = async() => {
        const res = await axios.get(`${link}/user/${userId}`).catch(err=>console.log(err))
        const data = await res.data.user;
        return data;
    }

    const fetchDetails = async() => {
        const res = await axios.get(`${link}/post/`).catch(err=>console.log(err))
        const data = await res.data;
        return data;
    }

    useEffect(() => {
        console.log(answers)
    }, [posts, user, answers]);

    const createPost = async() => {
        const res = await axios.post(`${link}/post/create`, {
            question,
            klass: id,
            user: userId
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleCreatePost = (e) => {
        e.preventDefault();
        if(!question){
            setError("Please type something!")
        }else{
            setError("")
            createPost().then(()=>{
                window.location.reload()
            })
        }
    }

    // Add answer
    const addAnswer = async(postId) => {
        const res = await axios.post(`${link}/post/answers/add`, {
            answer,
            user: userId,
            post: postId
        }).catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }

    const handleAnswerSubmit = async(e, postId) => {
        e.preventDefault();
        if(!answer){
            setError("Please type something!")
        }else{
            setError("")
            await addAnswer(postId).then(()=>{
                window.location.reload()
            })
        }
    }

    //******************************* */

    const fetchAnswers = async() => {
        const res = await axios.get(`${link}/post/answers`).catch(err=>console.log(err))
        const data = await res.data.answers;
        return data;
    }

    useEffect(()=>{ 
        fetchUserDetails()
        .then((data)=>{
            setUser(data)
        })

        fetchDetails()
        .then((data)=>{
            setPosts(data.posts)
        })

        fetchAnswers()
        .then((data)=>{
            setAnswers(data)
        })
    },[id])

    return ( 
        <div className="content">
            <Title propTitle={"Q&A"}/>

            <div className="qna">

                <div className="q-input">
                    <div className="q-img" style={{backgroundColor: `${user.color}`}}>{user.name[0].toUpperCase()}</div>
                    <input type="text" placeholder="Add Question" value={question} onChange={(e)=>setQuestion(e.target.value)}/>
                    <button onClick={handleCreatePost}>Submit</button>
                </div>
                {error && <p className='error'>{error}</p>}

                {posts.length === 0 ?
                    <>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center"}}>
                        <img src={leaf} alt="Empty" className='empty'/>
                        <p>No One has Posted</p>
                        </div>
                    </>
                    :
                    <>
                    {posts.slice().reverse().map((post, index)=> 
                    post.class === id &&
                    <div className="qna-post" key={index}>  
                    <div className="question-div">
                        <div className="info">
                            <div className="a-img" style={{backgroundColor: `${post.user.color}`}}>{post.user.name[0].toUpperCase()}</div>
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
                        <div className="a-img" style={{backgroundColor: `${user.color}`}}>{user.name[0].toUpperCase()}</div>
                        <input type="text" placeholder="Answer" onChange={(e)=>{setAnswer(e.target.value)}}/>
                        <button onClick={(e)=>handleAnswerSubmit(e, post._id)}>Answer</button>
                    </div>
                    

                    <div className="comments">
                        {answers.length !== 0 && answers.slice().reverse().map((answer, index) => (
                        answer.post === post._id &&
                        <div className="comment" key={index}>
                            <div className="info">
                                <div className="a-img" style={{backgroundColor: `${answer.user.color}`}}>{answer.user.name[0].toUpperCase()}</div>
                                <div>
                                    <h4>{answer.user.name}</h4>
                                    <p>{handleDate(answer.date)}</p>
                                </div>
                            </div>
                            <p>{answer.answer}</p>
                        </div>
                        ))}
                    </div>
                    <hr className="hr"/>
                    </div>
                    )}
                </>
                }

            </div>
        </div>
     );
}
 
export default QnA;