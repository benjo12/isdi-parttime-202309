import context from "./context";
import { validate, errors } from "com";

const { SystemError } = errors;

export default function deleteEvent(eventId) {
  validate.id(eventId, "event id");

  return (async () => {
    const req = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${context.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({eventId}),
    };

    let res;
    try {
      res = await fetch(`${import.meta.env.VITE_API_URL}/events/del`, req);
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
