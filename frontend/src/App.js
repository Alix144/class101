import { Routes, Route } from 'react-router-dom'

//components
import Header from "./components/Header1";


//pages
import Main from "./pages/Main";
import Auth from './pages/Auth';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
        
    </div>
  );
}

export default App;
