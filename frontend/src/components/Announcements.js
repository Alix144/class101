import Title from "./Title";

import trash from '../images/trash-can.png'
import edit from '../images/pencil.png'

const Announcements = () => {
    return ( 
        <div className="content announcements">
            <Title propTitle={"Announcements"} add={"announcements"}/>

            <div className="announcement-box">
                <div className="left-border"></div>
                <div className="info">
                    <div className="profile-pic">S</div>
                    <div>
                        <h4>About course books</h4>
                        <p>Sara Nur</p>
                    </div>
                </div>
                <div className="announcement-text">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus br neque, culpa enim nesciunt nisi vero. Omnis nisi ex amet consequuntur sint fuga nobis magnam, aut corrupti esse?</p>
                </div>
                <p className="date">25-03-2023</p>
                <div className="update-delete">
                    <img src={trash} alt="Delete" />
                    <img src={edit} alt="" />
                </div>
            </div>

            <div className="announcement-box">
                <div className="left-border"></div>
                <div className="info">
                    <div className="profile-pic">S</div>
                    <div>
                        <h4>Starting Date</h4>
                        <p>Sara Nur</p>
                    </div>
                </div>
                <div className="announcement-text">
                    <p>Lorem ipsum dolor, sit Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta error, laborum incidunt quisquam fugit non fugiat nulla inventore, magni reprehenderit, eos laudantium! Laboriosam error hic doloremque harum, quod ea sint! amet consectetur adipisicing elit. Possimus br neque, culpa enim nesciunt nisi vero. Omnis nisi ex amet consequuntur sint fuga nobis magnam, aut corrupti esse?</p>
                </div>
                <p className="date">20-03-2023</p>

                <div className="update-delete">
                    <img src={trash} alt="Delete" />
                    <img src={edit} alt="" />
                </div>

            </div>
        </div>
     );
}
 
export default Announcements;