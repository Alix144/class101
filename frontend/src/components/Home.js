import Board from "./Board";
import ClassesContainer from "./ClassesContainer";
import Title from "./Title";

const Home = () => {

    return ( 
        <>
        <main>
            <Board/>
            <div className="content">
                <Title propTitle={"Teaching Classes"}/>
                <ClassesContainer type={"teaching"}/>
                <Title propTitle={"Learning Classes"} add={"searchClass"}/>
                <ClassesContainer type={"learning"}/>
            </div>
        </main>
        </>
     );
}
 
export default Home;