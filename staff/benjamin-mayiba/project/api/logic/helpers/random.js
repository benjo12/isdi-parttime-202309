function name() {
    return `name-${Math.random()}`
}

function email() {
    return `e-${Math.random()}@mail.com`
}

function password() {
    return `password-${Math.random()}`
}

function image() {
    return `image-${Math.random()}`
}

function text() {
    return `text-${Math.random()}`
}

function date() {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const day = String(futureDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}



function time() {
    const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${hours}:${minutes}`;
}


function description() {
    return `description-${Math.random()}`
}

const random = {
    name,
    email,
    password,
    image,
    text,
    date,
    time,
    description
}

export default random     