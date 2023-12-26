import ClassInfo from "./ClassInfo";

const Board = () => {
    return ( 
        <div className="board2">
            <ClassInfo/>
            <div className="nav">
                <div><a >Dashboard</a></div>
                <div><a>Announcements</a></div>
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