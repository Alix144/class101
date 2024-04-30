import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import send from '../images/send.png'
import emojy from '../images/emojy.png'
import attach from '../images/attach.png'

import io from 'socket.io-client';


const Chat = () => {
    const classId = useParams().id
    const userId = localStorage.getItem("userId");

    const currentDate = new Date();
    const socket = io.connect("http://localhost:4000")

    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        socket.emit('join_room', classId);

        socket.on('receive_message', (data) => {
            console.log(data)
            setMessages([...messages, data])
        })

        socket.on('typing', (data) => {
            console.log("user is typingggg" + data)
            setIsTyping(true)
        })

        socket.on('typing_stoped', () => {
            console.log("user stopped typingggg")
            setIsTyping(false)
        })

        return () => {
            socket.disconnect();
        };
    }, [socket]);


    const handleSendMessage = async() => {
        const res = await axios.post("http://localhost:4000/chat/send", {
            user: userId,
            klass: classId,
            content: messageInput
        })
        .catch(err=>console.log(err));
        const data = await res.data;
        console.log(data)
        return data;
    }
    
    const sendMessage = (e) => {
        e.preventDefault()
        {messageInput &&
            handleSendMessage().then(() => {
                setMessages([...messages, {class: classId, content: messageInput, date: currentDate.toISOString(), sender: {_id: userId, name: user.name, surname: user.surname}}])
                socket.emit('send_message', {class: classId, content: messageInput, date: currentDate.toISOString(), sender: {_id: userId, name: user.name, surname: user.surname}});
                setMessageInput("")
            });
        }
    }

    /**** fetch data ****/

    const getMessages = async() => {
        const res = await axios.get(`http://localhost:4000/chat/${classId}`).catch(err=>console.log(err))
        const data = await res.data.messages
        console.log(data)
        return data;
    }

    useEffect(()=>{ 
        getMessages().then(
            (data)=>{setMessages(data) 
            })
    },[classId])

    /**** fetch User ****/

    const fetchUser = async() => {
        const res = await axios.get(`http://localhost:4000/user/${userId}`).catch(err=>console.log(err))
        const data = await res.data.user;
        console.log(data)
        return data;
    }

    useEffect(()=>{ 
        fetchUser()
        .then((data)=>{
            setUser(data)
        })
    },[])

    /**** Typing event ****/
    // useEffect(()=>{ 
    //     if(messageInput != ""){
    //         setTyping(true)
    //         socket.emit('typing', {classId, name: user.name});
    //     }
    //     else{
    //         setTyping(false)
    //         socket.emit('typing_stoped', {classId});
    //     }
    // },[messageInput])

    // const typingHandler = (e) => {
    //     setMessageInput(e.target.value)

    //     if(messageInput != ""){
    //         socket.emit('typing', {classId, name: user.name});
    //     }

    //     if(messageInput === ""){
    //         socket.emit('typing_stoped', {classId});
    //     }

    // }

    // useEffect(()=>{ 
        

    //     socket.on('typing_stoped', () => {
    //         console.log("typingggg stopeed")
    //     })
    // },[])

    return ( 
        <div className="content chat">

            <div className="output-msg">

                <div className="chat-info">
                    <div className='chat-info2'>
                        <div className='chat-img'>S</div>
                        <h4>Chat</h4>
                    </div>
                </div>
                    <hr />
                <div className="chat-content">

                    {/* {isTyping && 
                        <div className="others-msg">
                            <div className="msg-text" style={{margin: "0", padding: "5px"}}>
                                <p style={{position: "static"}}><b>Ali</b> is typing...</p>
                            </div>
                        </div>
                    } */}

                    {messages && 
                    messages.slice().reverse().map((message, index)=>(

                    message.sender._id != userId ?
                    <div className="others-msg" key={index}>
                        <div className="msg-pic">{message.sender && message.sender.name[0].toUpperCase()}</div>
                        <div className="msg-text">
                            <h4>{message.sender.name} {message.sender.surname}</h4>
                            <h5>{message.content}</h5>
                            <p>{moment(message.date).format('hh:mm A')}</p>
                        </div>
                    </div>
                    :
                    <div className="my-msg">
                        <div className="msg-text">
                            <h4>You</h4>
                            <h5>{message.content}</h5>
                            <p>{moment(message.date).format('hh:mm A')}</p>
                        </div>

                        <div className="msg-pic">{message.sender && message.sender.name[0].toUpperCase()}</div>
                    </div>

                    ))
                    }

                    

                </div>

                <div className="bottom-border"></div>
            </div>

            <div className="input-msg">
                <div className="input">
                    <img src={emojy} alt="Emojy" />
                    <input type="text" value={messageInput} onChange={(e)=>{setMessageInput(e.target.value)}}/>
                </div>
                
                <div className="send" onClick={(e)=>sendMessage(e)}>
                    <img src={send} alt="Send" />
                </div>
            </div>
        </div>
     );
}
 
export default Chat;