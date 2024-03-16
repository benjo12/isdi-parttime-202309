import React, { useState } from "react";


function EventForm({ services, onCreateEvent }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
 
  const handleCreateEvent = (e) => {
    e.preventDefault();

    // Validation and event creation logic...
    if (!selectedServiceId) {
      alert("Please select a service");
      return;
    }

    onCreateEvent(selectedServiceId, date, time);

  };

  return (
    <div>
       
      <h2>Create Event</h2>
      <form onSubmit={handleCreateEvent}>
        <>
          <label className="event-date">Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </>
        <>
          <label className="event-time">Time: </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </>
        <>
          <label className="event-service">Service: </label>
          <select
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </>
        <>
          <button className="event-add" type="submit">Add</button>
        </>
      </form>
    </div>
  );
}

export default EventForm;
