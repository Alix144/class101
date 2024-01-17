import NoteBox from "./NoteBox";
  
const NotesContainer = ({isCompleted}) => {
    const color = isCompleted ? '#E1FFA0' : '#FFD464';
    return ( 
        <div className="notes-container">
            <NoteBox color={color}/>
            <NoteBox color={color} />
            <NoteBox color={color} />
            <NoteBox color={color} />
        </div>
     );
}
 
export default NotesContainer;