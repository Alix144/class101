import add from '../images/plus.png'
import emptyBox from '../images/empty-box.png'
import copy from '../images/copy.png'
import noTask from '../images/no-task.png'

const ClassroomHome = () => {
    return ( 
        <div className="content classroom-home">
            <div className="announcements-div">
                <div className="div-title">
                    <h4>Announcements</h4>
                    <img src={add} alt="Add" />
                </div>
                <div className="div-content">
                    <img src={emptyBox} alt="Empty-box" />
                    <p>This is were you can see your 
                        instructor’s announcements</p>
                </div>
            </div>

            <div className="code-todo-div">
                <div className="code">
                    <div className="div-title">
                        <h4>Invitation Code</h4>
                    </div>
                    <div className='code-string'>
                        <h2>9OID8S2D</h2>
                        <img src={copy} alt="Copy" />
                    </div>
                </div>
                <div className="todo-div">
                    <div className="div-title">
                        <h4>To Do</h4>
                    </div>
                    <div className="div-content">
                        <img src={noTask} alt="No-Task" id='no-task'/>
                        <p>No work to be done</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ClassroomHome;