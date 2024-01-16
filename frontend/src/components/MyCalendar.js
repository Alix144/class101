import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);
const MyCalendar = () => {
    const events = [
        {
          title: 'Meeting',
          start: new Date(2024, 0, 16, 10, 0),
          end: new Date(2024, 0, 16, 12, 0),
        },
        // Add more events as needed
      ];

    return (
        <div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }} // Set the calendar height as needed
          />
        </div>
      );
}
 
export default MyCalendar;