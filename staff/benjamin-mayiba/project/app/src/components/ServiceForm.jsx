import React, { useState } from 'react';
import logic from '../logic'
import { useNavigate } from "react-router-dom";

export default function ServiceForm(){

  // Estados locales para el nombre, descripción y error del servicio
    const [name, setName] = useState('') 
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async event =>{
        event.preventDefault()

        try {
            await logic.createService(name, description)
            setName('') 
            setDescription('')
           navigate("/services")
        } catch (error) {
            setError("Error : " + error.message);
        }
    }

    return (
        <div>
        
           {error && <p>{error}</p>}
           {!error && <form className="form service-form" onSubmit={handleSubmit}>
               <label className="label" htmlFor="name-input">Name </label>
               <input className="input" id="name-input" type='text' placeholder='service name' value={name} onChange={e => setName(e.target.value)}/>

                <label className="label" htmlFor="description-input"> Description </label>
               <input className="input" id="description-input" type='text' placeholder='service description' value={description} onChange={e => setDescription(e.target.value)}/>

               <button type="submit">Add</button>
           </form>}
        </div>
    )
}