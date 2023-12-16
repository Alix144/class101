import { useNavigate } from "react-router-dom";

// images
import heroImg from "../images/hero-img.png"
import img1 from "../images/img1.jpg"
import logo2 from "../images/logo2.png"

const Main = () => {
    const navigate = useNavigate();
    
    const navigateTo = () => {
        navigate("/auth")
    }

    return ( 
        <div className="main">
            

            <div className="intro">
                <div className="text">
                    <h1>Empower Educators, Inspire Learners</h1>
                    <p>For educators, we provide the tools to inspire and engage your students. For learners, we offer resources to empower you in your educational journey.</p>
                    <button onClick={navigateTo}>Register</button>
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

            <div className="testimonials">
                <h1>Testimonials</h1>

                <div className="testimonials-parent">

                    <div className="testimonial">
                        <div className="person">
                            <div className="circle1"></div>
                            <h3>Fairuz</h3>
                        </div>
                        <p>“As an educator, I've tried various online platforms for managing classrooms, but Class101 stands out as a game-changer. It simplifies lesson planning, grading, and communication with students seamlessly.”</p>
                    </div>

                    <div className="testimonial">
                        <div className="person">
                            <div className="circle2"></div>
                            <h3>Ahmed Nur</h3>
                        </div>
                        <p>“I can't thank Class101 enough for making my learning experience so much better. The user-friendly interface, instant access to assignments, and real-time collaboration with classmates have transformed the way I approach my studies.”</p>
                    </div>

                    <div className="testimonial">
                        <div className="person">
                            <div className="circle3"></div>
                            <h3>Jack Maddeson</h3>
                        </div>
                        <p>"As a parent, I've witnessed the positive impact Class101 has had on my child's education. The transparency it provides into their assignments, progress, and communication with teachers is invaluable.”</p>
                    </div>

                </div>

            </div>

            <div className="cta">
                <div>
                    <h1>Ready to give us a go?!</h1>
                    <p>"Unlock a World of Seamless Learning with Class101! Join thousands of educators and students who have transformed their classrooms with our intuitive platform.”</p>
                    <button onClick={navigateTo}>Register</button>
                </div>
            </div>

            <footer>
                <div className="logo">
                    <img src={logo2} alt="logo" />
                    <h2>Class101</h2>
                </div>
                <p>© Class101. 2024. We love our users!</p>
            </footer>
        </div>
     );
}
 
export default Main;