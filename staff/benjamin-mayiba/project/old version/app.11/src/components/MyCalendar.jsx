import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => (
  <div>
    <h2>{moment().format('MMMM YYYY')}</h2>
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={[]} // Puedes dejarlo vacío si no tienes eventos
        style={{ margin: '50px' }}
      />
    </div>
  </div>
);

export default MyCalendar;
