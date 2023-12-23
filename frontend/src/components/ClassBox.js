import ProfileImg from './ProfileImg'

import student from '../images/student.png'
import teacher from '../images/teacher.png'
import more from '../images/more.png'

const ClassBox = ( {color, img}) => {
    let primaryColor;
    let secondColor;
    let picColor;

    if(color === "red"){
        primaryColor = "#FF6161"
        secondColor = "#D10F0F"
        picColor = "#FFC0C0"

    }else if(color === "purple"){
        primaryColor = "#D650F8"
        secondColor = "#A024AB"
        picColor = "#E6AFFF"
    }
    else if(color === "green"){
        primaryColor = "#86FFAF"
        secondColor = "#15B84D"
        picColor = "#DDFFE9"
    }
    else if(color === "yellow"){
        primaryColor = "#FFD15A"
        secondColor = "#E3A609"
        picColor = "#FFEAB5"
    }else{
        primaryColor = "#74BCFF"
        secondColor = "#282DA4"
        picColor = "#C2DEFF"
    }
    
    return ( 
        <div className="class-box" style={{backgroundColor: (primaryColor)}}>
            <div className="class-img" style={{backgroundImage: `url(${img})`}}>
                <div className="img-overlay" style={{backgroundImage: `linear-gradient(${secondColor}, ${primaryColor})`}}></div>
                <img src={more} alt="More" className="more" />
                <ProfileImg picColor={picColor}/>
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