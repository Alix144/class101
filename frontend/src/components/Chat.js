import send from '../images/send.png'
import emojy from '../images/emojy.png'
import attach from '../images/attach.png'

const Chat = () => {
    return ( 
        <div className="content chat">
            <div className="output-msg">
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