import React, { useState, useEffect } from "react";
import logic from "../logic";
import EventList from "../components/EventList";
import Services from "../components/Services";
import ServiceForm from "../components/ServiceForm";
import EventForm from "../components/EventForm";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../components/Profile";

export default function Home(props) {
  const [name, setName] = useState(null);
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showMessage, setShowMessage] = useState(true); // Controla la visibilidad del mensaje
  const [showEventForm, setShowEventForm] = useState(false);
  const [services, setServices] = useState([]); // Estado para almacenar la lista de servicios
   const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

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
  const handleAddEventClick = () => {
    setSubmitted(false);
    setShowEventForm(true); // Muestra el formulario de creación de evento
    navigate("/addEvent"); // Navega a la ruta "/addEvent"
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
      alert(error.message);
    }
  };

  const handleLogout = () => {
    
    props.onLogout();
     
  };

  const handleShowServices = () => {
    navigate("/services");
    setShowMessage(false); // Oculta el mensaje al cambiar de página
    setSubmitted(false);
  };

  const handleProfileClick = () =>{
    navigate("/profile");
    setShowMessage(false); 
    setSubmitted(false);
  }

  const handleShowEvents = async () => {
    navigate("/events");
    setSubmitted(false);
    try {
      const fullEvents = await logic.retrieveEvent();
      if (Array.isArray(fullEvents) && fullEvents.length === 0) {
        setMessage("No pending events");
        setShowMessage(true); // Muestra el mensaje si no hay eventos disponibles
      } else {
        //fullEvents.reverse()
        setEvents(fullEvents);
        setShowMessage(false); // Oculta el mensaje si hay eventos disponibles
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await logic.retrieveUser();
        setName(user.name);

        const fullEvents = await logic.retrieveEvent();
        if (Array.isArray(fullEvents) && fullEvents.length > 0) {
          //fullEvents.reverse();
          setEvents(fullEvents);
          setShowMessage(false); // Ocultar el mensaje si hay eventos disponibles
        } else {
          setMessage("No pending events");
          setShowMessage(true); // Muestra el mensaje al inicio si no hay eventos disponibles
        }

        const fetchedServices = await logic.retrieveServices(); // No necesitas pasar el userId aquí
        setServices(fetchedServices); // Actualiza la lista de servicios
      } catch (error) {
        alert(error.message);
      }
    })();

    // Llamar a handleShowEvents al cargar la página para mostrar los eventos por defecto
    handleShowEvents();
  }, []);

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
      console.error('Error deleting event:', error.message);
    }
  };


  return (
    <div className="home-container">
      <header className="header">
        <div>
          <p className="time">{`${formatDate(currentDateTime)} ${formatTimeUnit(
            currentDateTime.getHours()
          )}:${formatTimeUnit(currentDateTime.getMinutes())}:${formatTimeUnit(
            currentDateTime.getSeconds()
          )}`}</p>
          <h1>
            Connected: <a href="">{name}</a>
          </h1>
        </div>
        
      </header>

      {/* Renderizar EventList con los eventos solo si hay eventos presentes */}
      <div className="event">
        <div className="event-container">
          {/* Mensaje de eventos */}
          {showMessage && <p>{message}</p>}
           {/* Mensaje de evento creado con exito */}
          {submitted && <div>Event created successfully!</div>}

          <Routes>
            <Route
              path="/events"
              element={events.length > 0 ? <div><EventList events={events} onDeleteEvent={handleDeleteEvent} /></div> : null}
            />

            {/* Mostrar el componente Services si showServices es true */}
            <Route path="/services" element={<div><Services onServiceLogout={handleLogout} /></div>} />

            <Route path="/profile" element={<Profile/>}/>

            {/* Mostrar ServiceForm si showAddServices es true */}
            <Route path="/addService" element={<div><ServiceForm /></div>} />

            {/* Mostrar EventForm si showEventForm es true */}
            {showEventForm && <Route path="/addEvent" element={<EventForm services={services} onCreateEvent={handleCreateEvent} />} />}
          </Routes>
        </div>
      </div>

      {/* Botones Add Event y Add Service al final de la página */}
      <div className="footer">
        <div><button onClick={handleProfileClick}>👤</button> </div>
        <button className="btn" onClick={handleShowEvents}>📅</button>
        <div className="add-event"> <button  onClick={handleAddEventClick}>➕</button></div>
        <div> <button  onClick={handleShowServices}>💼</button> </div>
      </div>

    </div>
  );
}
