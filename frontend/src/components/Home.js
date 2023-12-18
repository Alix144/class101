import Board from "./Board";
import Title from "./Title";

const Home = () => {
    return ( 

        <main>
            <Board/>
            <div className="content">
                <Title propTitle={"Teaching Classes"}/>
            </div>
        </main>

     );
}
 
export default Home;