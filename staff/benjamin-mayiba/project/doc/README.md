# EasyBooking  App

## Intro
ReservaFácil es una aplicación web que simplifica el proceso de reserva de una amplia gama de servicios, desde citas de belleza y salud hasta sesiones de tutoría y eventos. La plataforma conecta a usuarios con proveedores de servicios, facilitando la búsqueda, selección y reserva de experiencias personalizadas.

![](https://media1.giphy.com/media/9X6OGGZ2SNyQ8/giphy.gif?cid=ecf05e47yl5pwgnwhcu59k5mv4mzjdn5hs0rrkyh48t7o8bc&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional Description

### Use Cases

- Explore Services
- Book Service
- Add Custom Service
- See Reservations
- Manage Profile
- Browse Services by Category
- View Services in a Category
- View Reviews and Ratings
- Update Service Availability
- Delete Reservation

## Technical Description

### Data Model  

User:
- id (string)
- fullName (string)
- email (string)
- password (string)
- reservations (array of Reservation IDs)

Service:
- id (string)
- name (string)
- category (string)
- availability (array of Availability objects)

Availability Object:
{
  id: (string),
  startDate: (string, "yyyy-mm-dd"),
  endDate: (string, "yyyy-mm-dd"),
  startTime: (string, "hh:mm"),
  endTime: (string, "hh:mm"),
  capacity: (number) // Maximum number of reservations that can be accommodated during this time slot
}

Reservation:
- id (string)
- userId (string)
- serviceId (string)
- date (string, "yyyy-mm-dd")
- status (string)
