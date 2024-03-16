import React, { useEffect, useState } from "react";
import logic from "../logic";
import context from "../logic/context";
import EventForm from "./EventForm";
import ServiceForm from "./ServiceForm"; // Importa el componente ServiceForm
import { FaTrash, FaSignOutAlt } from 'react-icons/fa'; // Importa el ícono de eliminación de react-icons
import { useNavigate } from "react-router-dom";


function Services(props) {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null); // Estado para almacenar el serviceId seleccionado
  const [showServiceForm, setShowServiceForm] = useState(false); // Estado para controlar la visibilidad del formulario de servicio
  const [error, setError] = useState(null); // Estado para almacenar el mensaje de error
  const[message, setMessage] = useState(null)
  const userId = context.token; // Obtén el userId de tu lógica de autenticación

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const fetchedServices = await logic.retrieveServices(userId);
        if(fetchedServices.length === 0){

          setMessage('No service added')
        }else{
          //console.log(fetchedServices);
          setServices(fetchedServices);
        }
        
      } catch (error) {
        setError("Error fetching services: " + error.message);
      }
    })();
  }, [userId]);

  const handleLogoutClick = (event) => {
    event.preventDefault();
    props.onServiceLogout();
};

  const handleDeleteService = async (serviceId) => {
    
      try {
        await logic.deleteService(serviceId);
        // Actualizar la lista de servicios después de la eliminación
        const updateServices = services.filter(
          (service) => service.id != serviceId
        );
        setServices(updateServices);
      } catch (error) {
       setError(error.message);
      }
    
  };

  // Función para manejar el clic en el botón "Add Service"
  const handleAddServiceClick = () => {
    // setShowServiceForm(true); // Mostrar el formulario de servicio al hacer clic en "Add Service"
    // setError(null)
    // setMessage(null)
    navigate("/addService")
  };

  return (
    <div>
      
      {/* Botón "Add Service" */}
     {!showServiceForm  && <div className="btn-services"><button onClick={handleAddServiceClick}>➕</button><button className="btn-logout" onClick={handleLogoutClick}> <FaSignOutAlt /> </button></div>} 

     {/* Mostrar el mensaje de error si existe */}
      {error && <p>{error}</p>}
      
      {/* Mostrar el mensaje cuando no hay servicios */}
      {message && <p>{message}</p>}
 

      {!message && !error && showServiceForm && <ServiceForm />}

      {!error && !message && !showServiceForm && (
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
