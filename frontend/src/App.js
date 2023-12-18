import { Routes, Route } from 'react-router-dom'

//components
import Header from "./components/Header1";
import Header2 from "./components/Header2";


//pages
import Main from "./pages/Main";
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Home from './components/Home';
import Calendar from './components/Calendar';
import ToDo from './components/ToDo';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
        <Header2/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/dashboard" element={<Dashboard/>}>
            <Route path="home" element={<Home/>}/>
            <Route path="calendar" element={<Calendar/>}/>
            <Route path="to-do" element={<ToDo/>}/>
          </Route>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
        
    </div>
  );
}

export default App;
