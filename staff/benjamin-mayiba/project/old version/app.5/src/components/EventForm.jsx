import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EventForm({ serviceId, onCreateEvent }) {
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            // Convertir la fecha a string en formato ISO (YYYY-MM-DD)
            const dateString = startDate.toISOString().slice(0, 10);
            await onCreateEvent(dateString, time);
            setStartDate(new Date()); // Reiniciar el valor del DatePicker
            setTime('');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Insert date"
                />

                <input
                    id="time-input"
                    type='text'
                    value={time}
                    placeholder='Insert time (HH:MM)'
                    onChange={e => setTime(e.target.value)}
                />

                <button type="submit">Add</button>
            </form>
        </div>
    )
}
