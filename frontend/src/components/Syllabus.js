import Title from "./Title";

import trash from '../images/trash-can.png'
import edit from '../images/pencil.png'

const Syllabus = () => {
    return ( 
        <div className="content">
            <Title propTitle={"Syllabus"} add={"syllabus"}/>

            <div className="syllabus-box">
                <div className="left-border"></div>
                <h3>Week 1:</h3>
                <div className="topics">
                    <ul>
                        <li>Verbs</li>
                        <li>Speaking</li>
                    </ul>
                </div>

                <div className="update-delete">
                    <img src={trash} alt="Delete" />
                    <img src={edit} alt="" />
                </div>

            </div>
            <div className="syllabus-box">
                <div className="left-border"></div>
                <h3>Week 1:</h3>
                <div className="topics">
                    <ul>
                        <li>Verbs</li>
                        <li>Speaking</li>
                        <li>Practicing</li>
                        <li>eating</li>
                        <li>playing</li>
                        <li>Speaking</li>
                    </ul>
                </div>

                <div className="update-delete">
                    <img src={trash} alt="Delete" />
                    <img src={edit} alt="" />
                </div>

            </div>
            <div className="syllabus-box">
                <div className="left-border"></div>
                <h3>Week 1:</h3>
                <div className="topics">
                    <ul>
                        <li>Verbs</li>
                        <li>Speaking</li>
                        <li>Speaking</li>
                    </ul>
                </div>

                <div className="update-delete">
                    <img src={trash} alt="Delete" />
                    <img src={edit} alt="" />
                </div>

            </div>

        </div>
     );
}
 
export default Syllabus;