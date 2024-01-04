import send from '../images/send.png'
import emojy from '../images/emojy.png'
import attach from '../images/attach.png'

const Chat = () => {
    return ( 
        <div className="content chat">

            <div className="output-msg">

                <div className="chat-info">
                    <div className='chat-info2'>
                        <div className='chat-img'></div>
                        <h4>Chat</h4>
                    </div>
                </div>
                    <hr />
                <div className="chat-content">
                    <div className="my-msg">
                        <div className="msg-text">
                            <h4>Ali Youssef</h4>
                            <h5>hi how are you ali? lorrks man</h5>
                            <p>13:03</p>
                        </div>

                        <div className="msg-pic"></div>
                    </div>

                    <div className="others-msg">
                        <div className="msg-pic"></div>

                        <div className="msg-text">
                            <h4>Ali Youssef</h4>
                            <h5>hi how are you ali? i love how you do your homeworks man</h5>
                            <p>13:08</p>
                        </div>

                    </div>

                    <div className="others-msg">
                        <div className="msg-pic"></div>

                        <div className="msg-text">
                            <h4>Ali Youssef</h4>
                            <h5>hi how are you ali? i love how you do your homeworks man</h5>
                            <p>13:08</p>
                        </div>

                    </div>

                </div>

                <div className="bottom-border"></div>
            </div>

            <div className="input-msg">
                <div className="input">
                    <img src={emojy} alt="Emojy" />
                    <input type="text" />
                    <img src={attach} alt="Attach-file" />
                </div>
                
                <div className="send">
                    <img src={send} alt="Send" />
                </div>
            </div>
        </div>
     );
}
 
export default Chat;