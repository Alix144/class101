import Title from "./Title";

const Notifications = () => {
    return ( 
        <main>
        <div className="content">
            <Title propTitle={"Notifications"}/>
            <div className="qna-post notification-details" >
                    <div className="question-div">
                        <div className="info">
                            <div className="a-img">A</div>
                            <div>
                                <h4>Sara Nur</h4>
                                <p>20-03-2023</p>
                            </div>
                        </div>
                        <div className="question">
                            <p><b>Sara</b> Invited you to <b>Spanish101</b> class.</p>
                        </div>
                        <hr />
                        <div className="on-page-btns">
                            <button className="danger">Reject</button>
                            <button>Accept</button>
                        </div>
                        
                    </div>
                    <hr className="hr"/>
            </div>
        </div>
        </main>
     );
}
 
export default Notifications;