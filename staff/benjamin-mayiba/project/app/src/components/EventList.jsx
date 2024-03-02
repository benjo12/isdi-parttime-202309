import React, { useState } from "react";

function EventList({ events, onDeleteEvent }) {
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDeleteClick = () => {
    onDeleteEvent(selectedEventId);
    setSelectedEventId(null);
  };

  return (
    <div>
      <h2>Events</h2>
      <select
        value={selectedEventId}
        onChange={(e) => setSelectedEventId(e.target.value)}
      >
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.name} - Date: {event.date} - Time: {event.time}
          </option>
        ))}
      </select>
      <button onClick={handleDeleteClick}>Delete Event</button>
    </div>
  );
}

export default EventList;
