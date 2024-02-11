# RemindMe: Your personal agenda

## Intro
RemindMe is an application that allows you to organize your appointments and reservations in a simple and intuitive way. With it, you can keep track of your upcoming events at the doctor, gym, hairdresser or any other service you need.

![](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2NtMHlrMWFzbWQ4b29keXl3ejVuaG14NDA4aHZ6NDVsNTJrcmE4YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z2ma2SQKva689hiqV7/giphy.gif)

## Main features:

 ### User Management

Description: 
 Users can create accounts, log in, and manage their personal information.

Usage:
 Users sign up with their email and password, log in to access their accounts, and update their profiles as needed.
 

### Service Management

Description: 
 Users can view available services, add new services, and delete existing services.

Example:
 A user adds "Yoga Classes" as a new service, views the list of available services, and deletes "Spa Treatment" from their list.

### Appointment 

Description:
 Users can schedule appointments within each service and manage their upcoming appointments.

Example:
  A user selects "Dentist Appointment," picks a date and time for their appointment, and receives a reminder two days before the appointment date.

## Functional Description

- Add services:
  You can add new services to the application at any time.

- Remove services: 
  If you no longer need a service, you can remove it from the application.

- View calendar: 
  Mark appointments: Select the date and time of your appointment in the calendar and save it in the application.

- View pending appointments:
  On the main screen, you can see a summary of the appointments you have pending for the next few days.

- Edit appointments: 
  You can modify the date, time or service of an appointment at any time.

- Delete appointments:
  If you no longer need an appointment, you can delete it from the application.

- Edit profile: 
  Modify account name, email, and password.

- Manage notifications: 
  Enable or disable   notifications for different types of reminders.

### Use Cases

1. User Sign-up

Description: Users create accounts to access the application.

- User navigates to the sign-up page.
- User enters their email and password.
- User submits the sign-up form.
- The system creates a new user account.

2. Appointment Scheduling

Description: Users schedule appointments for various services.

- User selects a service from the available list.
- User chooses a date and time for the appointment.
- User confirms the appointment details.
- The system saves the appointment in the database.

3. Service Management

Description: Users manage the list of available services.

- User navigates to the services management page.
- User views the list of available services.
- User adds a new service or removes an    existing service.
- The system updates the list of services       accordingly.


### Data Model  

User:
- Name (string)
- email (string)
- password (string)
- reservations (array of Appointment IDs)

Service:
- name (string)
- Description (string)


Appointment:
- User ID (reference to User)
- Service ID (reference to Service)
- Date (date)
- Time (time)
- Status (string)
