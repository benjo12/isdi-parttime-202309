import React from 'react';

function EventList({ events }) {
  return (
    <div>
      <h2>Events</h2>
      <select>
        {events.map(event => (
          <option key={event.id} value={event.id}>
           <span className='event-select'> {event.name} - Date: {event.date} - Time: {event.time}</span>
          </option>
        ))}
      </select>
    </div>
  );
}

export default EventList;
  