import NotesContainer from "./NotesContainer";
import Title from "./Title";

const ToDo = () => {
    return (
        <>
            {false && 
                <div className="on-page-div">
                    <div className="add-form">
                        <Title propTitle={"Create Class"}/>
                        <form action="">
                            <div>
                                <p>Name*</p>
                                <input type="text"/>
                            </div>
                            <div>
                                <p>Course Code</p>
                                <input type="text"/>
                            </div>
                            <div>
                                <p>Description</p>
                                <input type="text"/>
                            </div>
                            <div>
                                <p>Max Students</p>
                                <input type="number" min={1}/>
                            </div>
                            <div>
                            <p>Color</p>
                                <div className="colors">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
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