import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";

export default function EventForm({ serviceId, onCreateEvent }) {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Convertir la fecha a string en formato ISO (YYYY-MM-DD)
      const dateString = startDate.toISOString().slice(0, 10);
      await onCreateEvent(dateString, time);
      setStartDate(new Date()); // Reiniciar el valor del DatePicker
      setTime("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Date </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Insert date"
        />
         <label>Time </label>
        <TimePicker
          onChange={(time) => setTime(time)}
          value={time}
          clearIcon={null} // Oculta el icono de limpiar el campo
          format="HH:mm" // Formato de la hora
          locale="en-US" // Idioma
          //clockIcon={null} // Oculta el icono del reloj
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
