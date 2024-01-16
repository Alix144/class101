import Board from "./Board";
import Title from "./Title";
import MyCalendar from "./MyCalendar";


const Calendar = () => {
    return ( 
        <main>
            <div className="content">
                <Title propTitle={"Calendar"}/>
                <MyCalendar/>
            </div>
        </main>
     );
}
 
export default Calendar;