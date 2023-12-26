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

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  return (
    <div className="App">
      
        {isLoggedIn ? <Header2/> : <Header/>}

        <Routes>
          {!isLoggedIn ?
          <>
            <Route path="/" element={<Main/>}/>
            <Route path="/auth" element={<Auth/>}/>
          
          </> :
          
            <Route path="/dashboard" element={<Dashboard/>}>
              <Route path="home" element={<Home/>}/>
              <Route path="calendar" element={<Calendar/>}/>
              <Route path="to-do" element={<ToDo/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="classroom" element={<Classroom/>}/>
            </Route>
          
          }
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
        
    </div>
  );
}

export default App;
