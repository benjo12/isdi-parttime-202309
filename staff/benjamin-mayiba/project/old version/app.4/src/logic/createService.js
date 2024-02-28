import context from "./context";
import { validate, errors } from "com";

const { SystemError } = errors;

export default function createService(name, description) {
  validate.text(name, "name");
  validate.text(description, "description");

  return (async () => {
    const req = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.sessionUserId}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    };

    let res;
    try {
      res = await fetch(`${import.meta.env.VITE_API_URL}/services`, req);
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
