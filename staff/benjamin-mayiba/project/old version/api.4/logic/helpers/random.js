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
    return `date-${Math.random()}`
}

function time() {
    return `time-${Math.random()}`
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