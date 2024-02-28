import context from "./context";
import {  errors } from "com";

const { SystemError } = errors;

export default function retrieveEvent() {
  return (async () => {
    const req = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${context.sessionUserId}`
      }
    };
    let res;

    try {
      res = await fetch(`${import.meta.env.VITE_API_URL}/events`, req);
    } catch (error) {
      throw new SystemError(error.message); // error de conexion
    }

    if (!res.ok) {
      let body;
      try {
        body = await res.json(); // objeto json
      } catch (error) {
        throw new SystemError(error.message);
      }
      throw new errors[body.error](body.message);
    }

    try {
      const event = await res.json();

      return event;
    } catch (error) {
      throw new SystemError(error.message);
    }
  })();
}
