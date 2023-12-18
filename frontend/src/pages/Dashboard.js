import Sidebar from "../components/Sidebar";
import Board from "../components/Board";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return ( 
        <div className="dashboard">
            <Sidebar/>
            <Outlet/>
        </div>
     );
}
 
export default Dashboard;