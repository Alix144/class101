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
                <div onClick={()=>navigate('QnA')}>Q&A</div>
                <div onClick={()=>navigate('syllabus')}>Syllabus</div>
                <div onClick={()=>navigate('documents')}>Documents</div>
                <div onClick={()=>navigate('people')}>People</div>
            </div>
        </div>
     );
}
 
export default Board;