import ProfileImg from './ProfileImg'

import classbg1 from '../images/classbg.jpg'
import student from '../images/student.png'
import teacher from '../images/teacher.png'
import more from '../images/more.png'

const ClassBox = () => {
    return ( 
        <div className="class-box">
            <div className="class-img">
                <div className="img-overlay"></div>
                <img src={more} alt="More" className="more"/>
                <ProfileImg/>
            </div>
            <div className="class-box-info">
                <div>
                    <h4>Spanish</h4>
                    <p><b>Instructor:</b></p>
                    <p>Person1</p>
                </div>
                <div className='info-part2'>
                    <div>
                        <img src={teacher} alt="Teacher" />
                        <p>2</p>
                    </div>
                    <div>
                        <img src={student} alt="Student" />
                        <p>23</p>
                    </div>
                </div>


            </div>


        </div>
     );
}
 
export default ClassBox;