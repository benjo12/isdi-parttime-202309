import React, { useState } from 'react';
import logic from '../logic'

export default function ServiceForm(){

    const [name, setName] = useState('') 
    const [description, setDescription] = useState('')

    const handleSubmit = async event =>{
        event.preventDefault()

        try {
            await logic.createService(name, description)
            setName('')
            setDescription('')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
           <form onSubmit={handleSubmit}>
               <label htmlFor="name-input">Name </label>
               <input id="name-input" type='text' placeholder='service name' value={name} onChange={e => setName(e.target.value)}/>

                <label htmlFor="description-input"> Description </label>
               <input id="description-input" type='text' placeholder='service description' value={description} onChange={e => setDescription(e.target.value)}/>

               <button type="submit">Add</button>
           </form>
        </div>
    )
}