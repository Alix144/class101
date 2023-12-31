import NotesContainer from "./NotesContainer";
import Title from "./Title";

const ToDo = () => {
    return (
        <>
            <main>
            <div className="content">
                <Title propTitle={"To Do"} add={"toDo"}/>
                <NotesContainer isCompleted={false} />
                <Title propTitle={"Completed"}/>
                <NotesContainer isCompleted={true} />
            </div>
            </main>
        </>
     );
}
 
export default ToDo;