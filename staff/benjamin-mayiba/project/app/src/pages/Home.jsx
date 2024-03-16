import React, { useState, useEffect } from "react";
import logic from "../logic";
import EventList from "../components/EventList";
import Services from "../components/Services";
import ServiceForm from "../components/ServiceForm";
import EventForm from "../components/EventForm";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../components/Profile";

// Definición del componente Home
export default function Home(props) {
  // Estados locales del componente
  const [name, setName] = useState(null);
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showMessage, setShowMessage] = useState(true); // Controla la visibilidad del mensaje
  const [showEventForm, setShowEventForm] = useState(false);
  const [services, setServices] = useState([]); // Estado para almacenar la lista de servicios
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false)

  // Hook de navegación para cambiar entre rutas
  const navigate = useNavigate();

  // Efecto para actualizar la hora cada segundo
  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Actualizar cada segundo

    // Limpieza del intervalo para evitar fugas de memoria
    return () => clearInterval(intervalID);
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  // Función para formatear la hora, minutos y segundos con ceros a la izquierda si es necesario
  const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  // Función para formatear la fecha en formato DD/MM/YYYY
  const formatDate = (date) => {
    const day = formatTimeUnit(date.getDate());
    const month = formatTimeUnit(date.getMonth() + 1); // Los meses comienzan en 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Función para manejar el clic en el botón "Add Event" del footer
  const handleAddEventClick = async () => {
    setShowMessage(false);
    setSubmitted(false);
    setError(false);

    try {
      // Obtener la lista de servicios antes de abrir el formulario
      const fetchedServices = await logic.retrieveServices();
      setServices(fetchedServices);
    } catch (error) {
      setError("Failed to fetch services:", error.message);
      return; // Impedir la navegación si los servicios no se recuperan
    }

    // Mostrar el formulario de creación de evento y navegar a la ruta correspondiente
    setShowEventForm(true);
    navigate("/addEvent");
  };

  // Función para manejar la creación de un evento
  const handleCreateEvent = async (serviceId, date, time) => {
    try {
      // Crear el evento asociado al servicio
      await logic.createEvent(serviceId, date, time);
      console.log("Event successfully created for service with ID:", serviceId);
      setSubmitted(true); // Set submitted state to true
      // Ocultar el formulario de creación de evento
      setShowEventForm(false);
    } catch (error) {
      setShowEventForm(false);
      setError(error.message);
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    props.onLogout();
  };

  // Función para mostrar la lista de servicios
  const handleShowServices = () => {
    navigate("/services");
    setShowMessage(false); // Oculta el mensaje al cambiar de página
    setSubmitted(false);
    setError(false);
  };

  // Función para mostrar el perfil del usuario
  const handleProfileClick = () => {
    navigate("/profile");
    setShowMessage(false);
    setSubmitted(false);
    setError(false);
  };

  // Función para mostrar la lista de eventos
  const handleShowEvents = async () => {
    navigate("/events");
    setSubmitted(false);
    setError(false);

    try {
      // Obtener la lista completa de eventos
      const fullEvents = await logic.retrieveEvent();
      if (Array.isArray(fullEvents) && fullEvents.length === 0) {
        setMessage("No pending events");
        setShowMessage(true); // Muestra el mensaje si no hay eventos disponibles
      } else {
        // Mostrar los eventos si hay eventos disponibles
        setEvents(fullEvents);
        setShowMessage(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Efecto para cargar los datos iniciales al montar el componente
  useEffect(() => {
    (async () => {
      try {
        // Obtener el nombre del usuario y la lista de eventos al cargar la página
        const user = await logic.retrieveUser();
        setName(user.name);

        const fullEvents = await logic.retrieveEvent();
        if (Array.isArray(fullEvents) && fullEvents.length > 0) {
          setEvents(fullEvents);
          setShowMessage(false); // Ocultar el mensaje si hay eventos disponibles
        } else {
          setMessage("No pending events");
          setShowMessage(true); // Muestra el mensaje al inicio si no hay eventos disponibles
        }

        // Obtener la lista de servicios
        const fetchedServices = await logic.retrieveServices();
        setServices(fetchedServices);
      } catch (error) {
        setError(error.message);
      }
    })();

    // Llamar a handleShowEvents al cargar la página para mostrar los eventos por defecto
    handleShowEvents();
  }, []);

  // Función para eliminar un evento
  const handleDeleteEvent = async (eventId) => {
    try {
      await logic.deleteEvent(eventId);
      // Actualizar la lista de eventos después del borrado
      const updatedEvents = events.filter(event => String(event.id) !== String(eventId));
      if (updatedEvents.length === 0) {
        setMessage("No pending events");
        setShowMessage(true); // Mostrar el mensaje si no hay eventos disponibles
      } else {
        setEvents(updatedEvents);
      }
    } catch (error) {
      setError('Error deleting event:', error.message);
    }
  };

  // Nos quedamos en la home despues del cambio de correo o contraseña
  const handleChangeEmail = () => {
    navigate("/");
  };
  
  const handleChangePassword = () => {
    navigate("/");
  };

  // Renderizado del componente
  return (
    <div className="home-container">
      {/* Cabecera */}
      <header className="header">
        <div>
          {/* Hora actual */}
          <p className="time">{`${formatDate(currentDateTime)} ${formatTimeUnit(
            currentDateTime.getHours()
          )}:${formatTimeUnit(currentDateTime.getMinutes())}:${formatTimeUnit(
            currentDateTime.getSeconds()
          )}`}</p>

          {/* nombre de usuario */}
          <h1>
            Connected: <a href="">{name}</a>
          </h1>
        </div>
      </header>

      <div className="event">
        <div className="event-container">

          {/* Mostrar mensaje si no hay eventos, errores y éxito */}
          {showMessage && <p>{message}</p>}

          {/* Mensaje de éxito al crear un evento */}
          {submitted && <div>Event created successfully!</div>}

          {/* Mostrar  errores si occuren */}
          {error && <div>{error}</div>}

          {/* Enrutamiento de las diferentes secciones */}
          <Routes>
            {/* Mostrar la lista de eventos si hay eventos presentes */}
            <Route
              path="/events"
              element={events.length > 0 ? <div className="event-items"><EventList events={events} onDeleteEvent={handleDeleteEvent} /></div> : null}
            />

            {/* Mostrar el componente Services si showServices es true */}
            <Route path="/services" element={error ? null : <div><Services onServiceLogout={handleLogout} /></div>} />

            {/* Mostrar el perfil del usuario */}
            <Route path="/profile" element={error ? null : <div><Profile className="profile-container" onChangeEmail={handleChangeEmail} onChangePassword={handleChangePassword}/></div>}/>

            {/* Mostrar formulario para agregar servicio */}
            <Route path="/addService" element={error ? null : <div><ServiceForm /></div>} />

            {/* Mostrar formulario para agregar evento si showEventForm es true */}
            {showEventForm && <Route path="/addEvent" element={error ? null : <div><EventForm services={services} onCreateEvent={handleCreateEvent} /></div>} />}
          </Routes>
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="footer">
        <div><button title="profile" onClick={handleProfileClick}>👤</button> </div>
        <button className="btn" title="events" onClick={handleShowEvents}>📅</button>
        <div className="add-event" title=" add events"> <button  onClick={handleAddEventClick}>➕</button></div>
        <div> <button title="services"  onClick={handleShowServices}>💼</button> </div>
      </div>
    </div>  
  );
}
