import React, { useState, useEffect } from "react";

export default function Time() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
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

  return (
    <div>
      <p className="time">{`${formatDate(currentDateTime)} ${formatTimeUnit(
        currentDateTime.getHours()
      )}:${formatTimeUnit(currentDateTime.getMinutes())}:${formatTimeUnit(
        currentDateTime.getSeconds()
      )}`}</p>
    </div>
  );
}
