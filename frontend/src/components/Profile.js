import ClassesContainer from "./ClassesContainer";
import Title from "./Title";

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
                        <h4>Classes: 4</h4>
                    </div>
                    <div className="profile-div2">
                        <Title propTitle={"Details"}/>
                        <h1>hii</h1>
                    </div>
                </div>
            </div>
        </main>
 
     );
}
 
export default Profile;