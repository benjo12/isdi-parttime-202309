import React, { useEffect, useState } from "react";
import logic from "../logic";
import context from "../logic/context";
import EventForm from "./EventForm";
import ServiceForm from "./ServiceForm"; // Importa el componente ServiceForm
import { FaTrash } from 'react-icons/fa'; // Importa el ícono de eliminación de react-icons

function Services() {
  const [services, setServices] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false); // Estado para controlar la visualización del formulario
  const [selectedServiceId, setSelectedServiceId] = useState(null); // Estado para almacenar el serviceId seleccionado
  const [showServiceForm, setShowServiceForm] = useState(false); // Estado para controlar la visibilidad del formulario de servicio

  const userId = context.token; // Obtén el userId de tu lógica de autenticación

  useEffect(() => {
    (async () => {
      try {
        const fetchedServices = await logic.retrieveServices(userId);
        console.log(fetchedServices);
        setServices(fetchedServices);
      } catch (error) {
        console.error("Error fetching services:", error.message);
      }
    })();
  }, [userId]);

  
  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Do you really want to remove this service?")) {
      try {
        await logic.deleteService(serviceId);
        // Actualizar la lista de servicios después de la eliminación
        const updateServices = services.filter(
          (service) => service.id != serviceId
        );
        setServices(updateServices);
      } catch (error) {
        console.error("error while deleting sercice:", error.message);
      }
    }
  };

  // Función para manejar el clic en el botón "Add Service"
  const handleAddServiceClick = () => {
    setShowServiceForm(true); // Mostrar el formulario de servicio al hacer clic en "Add Service"
  };

  return (
    <div>
      {/* Botón "Add Service" */}
     {!showServiceForm && <button onClick={handleAddServiceClick}>➕</button>} 

      {showServiceForm && <ServiceForm />}

      {!showServiceForm && (
        <div>
          <h2>Service list</h2>
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                <div>
                  <span>
                    <FaTrash
                      className="trash-icon"
                      onClick={() => handleDeleteService(service.id)}
                    />
                  </span>
                  {service.name} - {service.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );
}

export default Services;
