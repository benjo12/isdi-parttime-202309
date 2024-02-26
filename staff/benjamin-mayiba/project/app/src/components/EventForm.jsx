import React, { useState } from 'react';

export default function EventForm({serviceId, onCreateEvent}){

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const handleSubmit = async event =>{
        event.preventDefault()

        try {
            await onCreateEvent(date, time)
            setDate('')
            setTime('')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

               <input id="date-input" type='text' value={date} placeholder='Insert date' onChange={e => setDate(e.target.value)}/>

               <input id="time-input" type='text' value={time} placeholder='Insert time' onChange={e => setTime(e.target.value)}/>

               <button type="submit">Add</button>
           </form>
        </div>
    )
}
