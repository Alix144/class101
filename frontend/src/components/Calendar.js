import Board from "./Board";
import Title from "./Title";

const Calendar = () => {
    return ( 
        <main>
            <Board/>
            <div className="content">
                <h1>calendar</h1>
                <Title propTitle={"Calendar"}/>
            </div>
        </main>
     );
}
 
export default Calendar;