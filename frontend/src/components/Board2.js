import { useNavigate } from "react-router-dom";
import ClassInfo from "./ClassInfo";

const Board = () => {
    const navigate = useNavigate();



    return ( 
        <div className="board2">
            <ClassInfo/>
            <div className="nav">
                <div onClick={()=>navigate('home')}>Dashboard</div>
                <div onClick={()=>navigate('announcements')}>Announcements</div>
                <div onClick={()=>navigate('chat')}>Chat</div>
                <div onClick={()=>navigate('assignments')}>Assignments</div>
                <div>Q&A</div>
                <div>Syllabus</div>
                <div>Documents</div>
                <div>People</div>
                <div>People</div>
            </div>
        </div>
     );
}
 
export default Board;