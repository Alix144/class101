import NotesContainer from "./NotesContainer";
import Title from "./Title";

const ToDo = () => {
    return ( 
        <main>
        <div className="content">
            <Title propTitle={"To Do"}/>
            <NotesContainer/>
            <Title propTitle={"Completed"}/>
        </div>
        </main>
     );
}
 
export default ToDo;