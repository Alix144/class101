import home from '../images/home.png'
import calendar from '../images/calendar.png'
import todolist from '../images/to-do-list.png'

const Sidebar = () => {
    return ( 
        <div className="sidebar">
            <div className='sidebar-list'>
                <img src={home} alt="Home" />
                <p>Home</p>
            </div>
            <div className='sidebar-list'>
                <img src={calendar} alt="Calendar" />
                <p>Calendar</p>
            </div>
            <div className='sidebar-list'>
                <img src={todolist} alt="To-Do-List" />
                <p>To Do</p>
            </div>
            <hr />
            <div className='sidebar-list'>
                <img src={todolist} alt="To-Do-List" />
                <p>To Do</p>
            </div>
            <hr />
            <div className='sidebar-list'>
                <img src={todolist} alt="To-Do-List" />
                <p>To Do</p>
            </div>
            <hr />
        </div>
     );
}
 
export default Sidebar;