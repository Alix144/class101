import Title from "./Title";

const QnA = () => {
    return ( 
        <div className="content">
            <Title propTitle={"Q&A"}/>

            <div className="qna">

                <div className="q-input">
                    <div className="q-img">A</div>
                    <input type="text" placeholder="Add Question"/>
                    <button>Submit</button>
                </div>

                <div className="qna-post">
                    <div className="question-div">
                        <div className="info">
                            <div className="a-img">A</div>
                            <div>
                                <h4>Ali Youssef</h4>
                                <p>20-03-2023</p>
                            </div>
                        </div>
                        <div className="question">
                            <p>Lorem. Inventore nemo cumklsa lskj ;lasjdf;l jasflj sadlf jsldkf asnf;lasnflsfnl;fl;sjfl;sdjf sque harum deserunt,uptas asperiores tenetur?</p>
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
                </div>
                <div className="qna-post">
                    <div className="question-div">
                        <div className="info">
                            <div className="a-img">A</div>
                            <div>
                                <h4>Ali Youssef</h4>
                                <p>20-03-2023</p>
                            </div>
                        </div>
                        <div className="question">
                            <p>Lorem. Inventore nemo cumklsa lskj ;lasjdf;l jasflj sadlf jsldkf asnf;lasnflsfnl;fl;sjfl;sdjf sque harum deserunt,uptas asperiores tenetur?</p>
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
                </div>

            </div>
        </div>
     );
}
 
export default QnA;