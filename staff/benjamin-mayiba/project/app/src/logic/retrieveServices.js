import context from "./context";
import { errors } from "com";

const { SystemError } = errors;

export default function retrieveServices() {
  return (async () => {
    const req = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${context.sessionUserId}`,
      },
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

    try {
      const services = await res.json();
      return services;
    } catch (error) {
      throw new SystemError(error.message);
    }
  })();
}
