import context from "./context";
import { validate, errors } from "com";

const { SystemError } = errors;

export default function createEvent(serviceId, date, time) {
  validate.id(serviceId, "service id");
  validate.text(date, "date");
  validate.text(time, "time");

  return (async () => {
    const req = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({serviceId, date, time })
    };

    let res;

    try {
      res = await fetch(`${import.meta.env.VITE_API_URL}/events`, req);
    } catch (error) {
      throw new SystemError(error.message);
    }

    if (!res.ok) {
      let body;

      try {
        body = await res.json();
      } catch (error) {
        throw new SystemError(error.message);
      }
      throw new errors[body.error](body.message);
    }
  })();
}
