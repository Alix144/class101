import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

//pages
import Main from "./pages/Main";
import Auth from './pages/Auth';

//components
import Header from "./components/Header1";
import Header2 from "./components/Header2";
import Dashboard from './pages/Dashboard';
import Home from './components/Home';
import Calendar from './components/Calendar';
import ToDo from './components/ToDo';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import Classroom from './components/Classroom';
import Announcements from './components/Announcements';
import ClassroomHome from './components/ClassroomHome';
import Chat from './components/Chat';
import Assignments from './components/Assignments';
import QnA from './components/QnA';
import Syllabus from './components/Syllabus';
import Documents from './components/Documents';
import People from './components/People';
import Notifications from './components/Notifications';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  return (
    <div className="App">
      
        {/* {isLoggedIn ? <Header2/> : <Header/>} */}
        {true ? <Header2/> : <Header/>}

        <Routes>
          {/* {!isLoggedIn ? */}
          {!true ?
          <>
            <Route path="/" element={<Main/>}/>
            <Route path="/auth" element={<Auth/>}/>
          
          </> :
          <>
            <Route path="/dashboard" element={<Dashboard/>}>
              <Route path="home" element={<Home/>}/>
              <Route path="calendar" element={<Calendar/>}/>
              <Route path="to-do" element={<ToDo/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="notifications" element={<Notifications/>}/>
              
              <Route path="classroom" element={<Classroom/>}>
                <Route path="home" element={<ClassroomHome/>}/>
                <Route path="announcements" element={<Announcements/>}/>
                <Route path="chat" element={<Chat/>}/>
                <Route path="assignments" element={<Assignments/>}/>
                <Route path="QnA" element={<QnA/>}/>
                <Route path="syllabus" element={<Syllabus/>}/>
                <Route path="documents" element={<Documents/>}/>
                <Route path="people" element={<People/>}/>
              </Route>

            </Route>
              </>
          }
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
        
    </div>
  );
}

export default App;
