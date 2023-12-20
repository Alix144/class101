import more from '../images/more.png'

const NoteBox = ({color}) => {
    return ( 
        <div className="note-box" style={{backgroundColor: color}}>
            <img src={more} alt="More" />
            <h4>Get the books</h4>
            <p>Spanish</p>
            <p>20-12-2023</p>
            <h5>get the books from the store</h5>
        </div>
     );
}
 
export default NoteBox;