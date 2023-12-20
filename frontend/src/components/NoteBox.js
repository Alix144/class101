import { useState } from 'react';
import more from '../images/more.png'

const NoteBox = ({color}) => {
    const [isMoreOpen, setMore] = useState(false)

    const showMore = () => {
        setMore(!isMoreOpen)
    }

    return ( 
        <div className="note-box" style={{backgroundColor: color}}>
            <img src={more} alt="More" onClick={showMore}/>
            <h4>Get the books</h4>
            <p>Spanish</p>
            <p>20-12-2023</p>
            <h5>get the books from the store</h5>
            {isMoreOpen &&
                <div className="note-more">
                    <h6>Complete</h6>
                    <hr />
                    <h6>Edit</h6>
                    <hr />
                    <h6>Delete</h6>
                </div>
            }
        </div>
     );
}
 
export default NoteBox;