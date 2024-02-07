import axios from "axios";
import NoteBox from "./NoteBox";
import { useEffect, useState } from "react";

const NotesContainer = ({isCompleted}) => {
    const id = localStorage.getItem("userId");
    const [notes, setNotes] = useState();

    const sendRequest = async() => {
        const res = await axios.get(`http://localhost:4000/task/view/${id}`).catch(err=>console.log(err))
        const data = await res.data.tasks
        console.log(data)
        return data;
    }

    useEffect(() => {
        sendRequest().then(data=>setNotes(data))
    },[])

    return ( 
        <div className="notes-container">

            {notes && notes.slice().reverse().map((note, index)=>{
                console.log(note)
                if(isCompleted === false && note.isCompleted === false){
                    return <NoteBox key={index} id={note._id} title={note.title} description={note.description} deadline={note.deadline} isCompleted={note.isCompleted}/>
                }
                else if(isCompleted && note.isCompleted)
                    return <NoteBox key={index} id={note._id} title={note.title} description={note.description} deadline={note.deadline} isCompleted={note.isCompleted}/>
                }
            )}
        </div>
     );
}
 
export default NotesContainer;