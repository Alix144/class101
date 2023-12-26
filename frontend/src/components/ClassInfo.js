import teacher from '../images/teacher.png'
import student from '../images/student.png'
import pen from '../images/pen.png'

const ClassInfo = () => {
    return ( 
        <div className="class-info">
            <div className='class-name-pic'>
                <div><h1>S</h1></div>
                <h1>Spanish</h1>
                <img src={pen} alt="Edit" />
            </div>
            <div className='class-code'>
                <h5>Course Code:</h5>
                <p>ESP101</p>
            </div>
            <div>
                <h5>Description:</h5>
                <p>Unlock the beauty of Spanish in our Beginner Course.
                    From fundamental grammar to practical communication,
                     our dynamic lessons immerse you in the language.</p>
            </div>

            <div className="people-num">
                <div>
                    <img src={teacher} alt="Instructor" />
                    <p>1</p>
                </div>
                <div>
                    <img src={student} alt="Student" />
                    <p>203</p>
                </div>
            </div>
        </div>
     );
}
 
export default ClassInfo;