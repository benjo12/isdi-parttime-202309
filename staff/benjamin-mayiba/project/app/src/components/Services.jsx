import React, { useEffect, useState } from 'react';
import logic from '../logic'; 
import context from '../logic/context'


function Services() {
  const [services, setServices] = useState([]);
  const userId = context.sessionUserId; // Obtén el userId de tu lógica de autenticación

  useEffect(() => {
    
     (async () =>{
        try {
        const fetchedServices = await logic.retrieveServices(userId);
        console.log(fetchedServices)
        setServices(fetchedServices);
      } catch (error) {
        console.error('Error fetching services:', error.message);
      }
     })()

    
  }, [userId]);

  // Función para manejar la creación de un evento asociado a un servicio
  const handleAddEvent = async (serviceId) => {
    try {
      // Aquí puedes hacer lo que necesites con el serviceId, como crear un evento
      await logic.createEvent(userId, serviceId, 'fecha', 'hora');
      console.log('Evento creado con éxito para el servicio con ID:', serviceId);
    } catch (error) {
      console.error('Error al crear evento:', error.message);
    }
  };

  return (
    <div>
      <h2>Service list</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <div>
                {service.name} - {service.description}
              
              <button className='serviceButton' onClick={() => handleAddEvent(service.id)}>Add event</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;