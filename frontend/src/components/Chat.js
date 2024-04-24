import axios from "axios";
import { useEffect, useState } from "react";


import send from '../images/send.png'
import emojy from '../images/emojy.png'
import attach from '../images/attach.png'

import io from 'socket.io-client';
const socket = io.connect("http://localhost:4000")

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    const sendMessage = () => {
        setMessages([...messages, messageInput]);
        console.log([...messages, messageInput])
        socket.emit("send_message", [...messages, messageInput])
        setMessageInput("")
    }

    useEffect(()=>{ 
        socket.on("receive_message", (data) => {
            console.log(data)
            setMessages(...messages, data);
        })
    },[socket])

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
                    {/* <div className="my-msg">
                        <div className="msg-text">
                            <h4>Ali Youssef</h4>
                            <h5>hi how are you ali? lorrks man</h5>
                            <p>13:03</p>
                        </div>

                        <div className="msg-pic">A</div>
                    </div>

                    <div className="others-msg">
                        <div className="msg-pic">A</div>

                        <div className="msg-text">
                            <h4>Ali Youssef</h4>
                            <h5>Lorem ipsum dolor sit amet, consectetur adipisic</h5>
                            <p>13:08</p>
                        </div>

                    </div>

                    <div className="others-msg">
                        <div className="msg-pic">A</div>

                        <div className="msg-text">
                            <h4>Ali Youssef</h4>
                            <h5>Lorem ipsum periam aut.</h5>
                            <p>13:08</p>
                        </div>

                    </div> */}

                    {messages && 
                    messages.map((message, index)=>(

                    <div className="others-msg" key={index}>
                        <div className="msg-pic">A</div>
                        <div className="msg-text">
                            <h4>aaaa</h4>
                            <h5>{message}</h5>
                            <p>12:09</p>
                        </div>
                    </div>

                    ))
                    }

                    

                </div>

                <div className="bottom-border"></div>
            </div>

            <div className="input-msg">
                <div className="input">
                    <img src={emojy} alt="Emojy" />
                    <input type="text" value={messageInput} onChange={(e)=>setMessageInput(e.target.value)}/>
                    <img src={attach} alt="Attach-file" />
                </div>
                
                <div className="send" onClick={()=>sendMessage()}>
                    <img src={send} alt="Send" />
                </div>
            </div>
        </div>
     );
}
 
export default Chat;