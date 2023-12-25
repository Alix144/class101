import ClassesContainer from "./ClassesContainer";
import Title from "./Title";

import classroom from '../images/classroom.png'

const Profile = () => {
    return (       
        <main>
            <div className="content">
                <Title propTitle={"Profile"}/>
                <div className="profile-divs">
                    <div className="profile-div1">
                        <div className="div1">
                            <div className="profile-div-pic"></div>
                            <h3>Ali Youssef</h3>
                        </div>
                        <div>
                            <h4>Description</h4>
                            <p>Hello, I'm Mrs. Sara, an experienced educator with a passion for English literature. With over a decade of teaching.</p>
                        </div>
                        <div className="classroom">
                            <img src={classroom} alt="Class-room" />
                            <h4>Classes:</h4>
                            <p>4</p>
                        </div>
                    </div>
                    <div className="profile-div2">
                        <div className="account-details">
                            <h4>Profile Details</h4>
                            <hr />
                        </div>

                        <form action="">
                            <div className="full-name">
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name"/>
                                </div>
                                <div>
                                    <label htmlFor="surname">Surname</label>
                                    <input type="text" name="surname" id="surname"/>
                                </div>
                            </div>

                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email"/>
                            </div>
                            <div className="description">
                                <label htmlFor="desc">Description</label>
                                <textarea name="desc" id="desc" cols="30" rows="6"></textarea>
                            </div>
                            <button>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
 
     );
}
 
export default Profile;