# RemindMe: Your personal agenda

## Intro
RemindMe is an application that allows you to organize your appointments and reservations in a simple and intuitive way. With it, you can keep track of your upcoming events at the doctor, gym, hairdresser or any other service you need.

![](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2NtMHlrMWFzbWQ4b29keXl3ejVuaG14NDA4aHZ6NDVsNTJrcmE4YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z2ma2SQKva689hiqV7/giphy.gif)



## Functional Description

### Use Cases

- Display the following events sorted by date from the most recent to the furthest back.
- display your services
- add new event (associating it to a service)
- delete event
- modify event(app.1)
- add service
- delete service
- modify service(app.1)







## Tecnical description

### Data Model  

User:
- Name (string)
- email (string)
- password (string)
- reminders (array of Event.id )

Service:
- name (string)
- description (string)


Event:
- user  (reference to User.id)
- service  (reference to Service.id)
- date (date)
- time (time)

