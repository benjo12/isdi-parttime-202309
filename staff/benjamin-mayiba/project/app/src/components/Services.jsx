import React, { useEffect, useState } from 'react';
import logic from '../logic';
import context from '../logic/context'
import EventForm from './EventForm'; // Importa el componente EventForm


function Services() {
  const [services, setServices] = useState([]);

  const [showEventForm, setShowEventForm] = useState(false); // Estado para controlar la visualización del formulario
  const [selectedServiceId, setSelectedServiceId] = useState(null); // Estado para almacenar el serviceId seleccionado

  const userId = context.sessionUserId; // Obtén el userId de tu lógica de autenticación

  useEffect(() => {

    (async () => {
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
  const handleAddEvent = (serviceId) => {

    try {
      setSelectedServiceId(serviceId)
      setShowEventForm(true)

    } catch (error) {
      console.error('Error al crear evento:', error.message);
    }
  };

  const handleCreateEvent = async (date, time) => {

    try {
      await logic.createEvent(userId, selectedServiceId, date, time)
      console.log('Event successfully created for service with ID:', selectedServiceId)

      setShowEventForm(false)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      {!showEventForm && <div>
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

      </div>}
      {showEventForm && <EventForm serviceId={selectedServiceId} onCreateEvent={handleCreateEvent} />}
    </div>
  );
}

export default Services;