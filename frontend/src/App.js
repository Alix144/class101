import { Routes, Route } from 'react-router-dom'

//components
import Header from "./components/Header1";
import Header2 from "./components/Header2";


//pages
import Main from "./pages/Main";
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
        <Header2/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
        
    </div>
  );
}

export default App;
