import Welcome from "../components/Welcome";
import { Outlet } from "react-router-dom";

const Board = () => {
    return ( 
        <div className="board">
            <Welcome/>
            <hr />
            <Outlet/>
            
        </div>
     );
}
 
export default Board;