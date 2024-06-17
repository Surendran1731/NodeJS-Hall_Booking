# Node-JS hall booking

## Created task deployed on below link :

<a href="https://hall-booking-nma7.onrender.com/" target="_blank">https://hall-booking-nma7.onrender.com/</a>

## Postman API docs link on below :

<a href="https://documenter.getpostman.com/view/27751149/2s946chEmU" target="_blank">https://documenter.getpostman.com/view/27751149/2s946chEmU</a>

### for getting all room details

get method:
https://hall-booking-nma7.onrender.com/rooms

### for creating room details

post method:
https://hall-booking-nma7.onrender.com/rooms

example data:
{
"roomName": "Auditorium",
"seats": 100,
"amenities": "wifi,projector,AC",
"price": 1500
}

### for getting all booking details

get method:
https://hall-booking-nma7.onrender.com/bookings

### for creating room bookings

post method:
https://hall-booking-nma7.onrender.com/bookings

Example data: 01)
{
"customerName": "suriya",
"roomId": "01",
"date": "12-Jul-2023",
"start": "08:00",
"end": "09:00",
"status": "confirmed"
}

Example data: 02)
{
"customerName": "suriya",
"roomId": "01",
"date": "12-Jul-2023",
"start": "08:00",
"end": "09:00",
"status": "confirmed"
}

-- Note:example 2 will show error of booking on same time

### for getting all booked rooms Data

get method:
https://hall-booking-nma7.onrender.com/bookedRooms

### for getting all customers data

get method:
https://hall-booking-nma7.onrender.com/customers

### for getting particular customers booked data

get method:
https://hall-booking-nma7.onrender.com/customers/suriya
