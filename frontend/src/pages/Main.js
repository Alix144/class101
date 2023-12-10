//components
import Header from "../components/Header1";

// images
import heroImg from "../images/hero-img.png"
import img1 from "../images/img1.jpg"
import img2 from "../images/img2.jpg"
import img3 from "../images/img3.jpg"
import img4 from "../images/img4.jpg"

const Main = () => {
    return ( 
        <div className="main">
            <Header/>
            <div className="intro">
                <div className="text">
                    <h1>Empower Educators, Inspire Learners</h1>
                    <p>For educators, we provide the tools to inspire and engage your students. For learners, we offer resources to empower you in your educational journey.</p>
                    <button>Register</button>
                </div>
                <img src={heroImg} alt="intro-img" />
            </div>

            <div className="about-us">
                <div>
                    <h1>About Us</h1>
                    <p>Embark on a journey where education transcends boundaries, and innovation becomes the cornerstone of learning. At Class101, our dedication is to craft a transformative educational experience that empowers educators and learners alike.</p>
                </div>
                <img src={img1} alt="instructor-using-laptop" />
            </div>

            <div className="features">
                <div className="card">
                    <div className="img1"></div>
                    <div>
                        <h3>Engage and Learn with Interactive Assignments</h3>
                        <p>Transform your learning experience with our interactive assignment feature.</p>
                    </div>
                </div>
                <div className="card">
                    <div className="img2"></div>
                    <div>
                        <h3>Effortless Grading</h3>
                        <p>Elevate your teaching experience with our powerful grading and analytics tools.</p>
                    </div>
                </div>
                <div className="card">
                    <div className="img3"></div>
                    <div>
                        <h3>Stay Organized, Boost Productivity</h3>
                        <p>Experience a new level of organization with our innovative tools designed to keep both students and teachers on track.</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Main;