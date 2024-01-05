import Title from "./Title";

import doc from '../images/doc.png'
import download from '../images/download.png'

const Assignments = () => {
    return ( 
        <div className="content assignments">
            <Title propTitle={"Assignments"} add={"announcements"}/>

            <div className="going-assignments">

                <div className="assignment">
                    <div className="info">
                        <img src={doc} alt="Document" />
                        <div>
                            <h4>Spanish Assignment 1</h4>
                            <h6>Deadline:</h6><p>22-10-2024</p>
                        </div>
                    </div>
                    <img src={download} alt="Download" />
                    <p className="date">01-06-2024</p>
                    <div className="left-border"></div>
                </div>

                <div className="assignment">
                    <div className="info">
                        <img src={doc} alt="Document" />
                        <div>
                            <h4>Spanish Assignment 1</h4>
                            <h6>Deadline:</h6><p>22-10-2024</p>
                        </div>
                    </div>
                    <img src={download} alt="Download" />
                    <p className="date">01-06-2024</p>
                    <div className="left-border"></div>
                </div>

            </div>

            <Title propTitle={"Coming Assignments"}/>
            <div className="coming-assignments">
                <div className="assignment">
                    <div className="info">
                        <div className="pic">A</div>
                        <div>
                            <h4>Ali Youssef</h4>
                            <h6>Spanish Assignment 1</h6>
                        </div>
                    </div>
                    <p className="date">01-06-2024</p>
                    <div className="left-border"></div>
                </div>

            </div>
        </div>
     );
}
 
export default Assignments;