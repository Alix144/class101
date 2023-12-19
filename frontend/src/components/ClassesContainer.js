import ClassBox from "./ClassBox";
import AddBox from "./AddBox";

const ClassesContainer = () => {
    return ( 
        <div className="classes-container">
            <ClassBox/>
            <ClassBox/>
            <ClassBox/>
            <ClassBox/>
            <ClassBox/>
            <AddBox/>
        </div>
     );
}
 
export default ClassesContainer;