import mongoose from 'mongoose'

const { Schema, model, ObjectId } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    reminders: [{
        type: ObjectId,
        ref: 'Event'
    }]
})

const service = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
     name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const event = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    service: {
        type: ObjectId,
        ref: 'Service'
    },
    date: {
        type: String, // Cambiado a tipo String
        default: () => new Date().toISOString().slice(0, 10) // Fecha en formato ISO (YYYY-MM-DD)
    },
    time: {
        type: String  // hora del evento en formato HH:MM
    }
})

const User = model('User', user)
const Service = model('Service', service)
const Event = model('Event', event)

export{
    User,
    Service,
    Event
}