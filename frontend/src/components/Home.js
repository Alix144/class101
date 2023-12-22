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
                <ClassesContainer/>
                <Title propTitle={"Learning Classes"}/>
                <ClassesContainer/>
            </div>
        </main>
        </>
     );
}
 
export default Home;