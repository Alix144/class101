import { Outlet } from "react-router-dom";

import Board2 from "./Board2";
import Title from "./Title";

const Classroom = () => {
    return ( 
        <main className="classroom-main">
            <Board2/>
            <Outlet/>
        </main>
     );
}
 
export default Classroom;