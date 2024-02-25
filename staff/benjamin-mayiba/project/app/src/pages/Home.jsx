import React, { useState, useEffect } from "react";
import logic from "../logic";
import EventList from "../components/EventList";
import Services from "../components/Services";
import ServiceForm from "../components/ServiceForm";

export default function Home(props) {
  const [name, setName] = useState(null);
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [showServices, setShowServices] = useState(false); // Inicialmente oculto
  const [showEvents, setShowEvents] = useState(true); // Inicialmente visible
  const [dateTime, setDateTime] = useState(new Date());
  const [showAddServices, setShowAddServices] = useState(false); // Inicialmente oculto

  useEffect(() => {
    const intervalId = setInterval(() => {}, 1000); // Actualizar cada segundo

    // Limpieza del intervalo para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);

  const handleLogoutClick = (event) => {
    event.preventDefault();
    props.onLogout();
  };
  const handleShowServices = () => {
    setShowServices(true);
    setShowEvents(false);
    setShowAddServices(false); // Asegurarse de que showAddServices esté desactivado
  };

  const handleShowEvents = () => {
    setShowServices(false);
    setShowEvents(true);
    setShowAddServices(false); // Asegurarse de que showAddServices esté desactivado
  };

  const handleServiceClick = (event) => {
    event.preventDefault();
    setShowAddServices(true);
    setShowEvents(false);
    setShowServices(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await logic.retrieveUser();
        setName(user.name);

        const fullEvents = await logic.retrieveEvent();
        if (fullEvents.length === 0) {
          //alert('No hay eventos pendientes');
          setMessage("No pending events");
        } else {
          fullEvents.reverse();

          setEvents(fullEvents);
        }
      } catch (error) {
        alert(error.message);
      }
    })();
  }, []);

  // Formatear la fecha y la hora
  const formattedDateTime = dateTime.toLocaleString();

  return (
    <div className="home-container">
      <header className="header">
        <div>
          <p>{formattedDateTime}</p>
          <h1>
            Connected: <a href="">{name}</a>
          </h1>
          <button className="services-button" onClick={handleShowServices}>
            Services
          </button>
          <button onClick={handleShowEvents}>Events</button>
        </div>
        <a href="">
          <button onClick={handleServiceClick}>Add service</button>
          <button className="btn" onClick={handleLogoutClick}>
            Logout
          </button>
        </a>
      </header>

      {/* Renderizar EventList con los eventos solo si hay eventos presentes */}
      <div className="event">
        <div className="event-container">
          {showEvents && message && <p>{message}</p>}
          {showEvents && events.length > 0 && <EventList events={events} />}

          {/* Mostrar el componente Services si showServices es true */}
          {showServices && <Services />}
          {/* Mostrar ServiceForm si showAddServices es true */}
          {showAddServices && <ServiceForm />}
        </div>
      </div>
    </div>
  );
}
