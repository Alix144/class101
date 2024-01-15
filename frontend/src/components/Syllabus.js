import { useSelector } from 'react-redux'

import Title from "./Title";

import trash from '../images/trash-can.png'
import edit from '../images/pencil.png'

const Syllabus = () => {
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)

    return ( 
        <div className="content">
            {isInstructor ?
                <Title propTitle={"Syllabus"} add={"addSyllabus"}/>
                :
                <Title propTitle={"Syllabus"}/>
            }

            <div className="syllabus-box">
                <div className="left-border"></div>
                <h3>Week 1:</h3>
                <div className="topics">
                    <ul>
                        <li>Verbs</li>
                        <li>Speaking</li>
                    </ul>
                </div>
                {isInstructor &&
                <div className="update-delete">
                    <img src={trash} alt="Delete" />
                    <img src={edit} alt="" />
                </div>
                }

            </div>
            <div className="syllabus-box">
                <div className="left-border"></div>
                <h3>Week 2:</h3>
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

                {isInstructor &&
                <div className="update-delete">
                    <img src={trash} alt="Delete" />
                    <img src={edit} alt="" />
                </div>
                }

            </div>
            <div className="syllabus-box">
                <div className="left-border"></div>
                <h3>Week 3:</h3>
                <div className="topics">
                    <ul>
                        <li>Verbs</li>
                        <li>Speaking</li>
                        <li>Speaking</li>
                    </ul>
                </div>

                {isInstructor &&
                <div className="update-delete">
                    <img src={trash} alt="Delete" />
                    <img src={edit} alt="" />
                </div>
                }

            </div>

        </div>
     );
}
 
export default Syllabus;