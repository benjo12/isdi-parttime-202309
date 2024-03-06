import React, { useState } from "react";

function EventForm({ services, onCreateEvent }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(""); // Estado para almacenar el ID del servicio seleccionado

  const handleCreateEvent = () => {
    // Verificar que se haya seleccionado un servicio
    if (!selectedServiceId) {
      alert("Please select a service");
      return;
    }

    // Llamar a la función onCreateEvent pasando los datos del evento y el ID del servicio seleccionado
    onCreateEvent(selectedServiceId,date, time);
  };

  return (
    <div>
      <h2>Create Event</h2>
      <div>
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Time: </label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div>
        <label>Service: </label>
        <select
          value={selectedServiceId}
          onChange={(e) => setSelectedServiceId(e.target.value)}
        >
          <option value=""> Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleCreateEvent}> Add</button>
    </div>
  );
}

export default EventForm;
