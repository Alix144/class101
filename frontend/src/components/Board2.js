import { useNavigate } from "react-router-dom";
import ClassInfo from "./ClassInfo";

const Board = () => {
    const navigate = useNavigate();



    return ( 
        <div className="board2">
            <ClassInfo/>
            <div className="nav">
                <div onClick={()=>navigate('home')}><a >Dashboard</a></div>
                <div onClick={()=>navigate('announcements')}><a>Announcements</a></div>
                <div><a>Chat</a></div>
                <div><a>Assignments</a></div>
                <div><a>Q&A</a></div>
                <div><a>Syllabus</a></div>
                <div><a>Documents</a></div>
                <div><a>People</a></div>
            </div>
        </div>
     );
}
 
export default Board;