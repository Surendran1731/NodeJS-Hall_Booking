// creating required modules
const express = require("express");
const cors = require("cors");
const app = express();
const { format } = require("date-fns");

app.use(cors());
app.use(express.json());

// creating local data for rooms & bookings
const rooms = [
  {
    roomName: "Auditorium",
    roomId: "01",
    seats: 100,
    amenities: "wifi,projector,AC",
    price: 1500,
  },
  {
    roomName: "Banquet",
    roomId: "02",
    seats: 150,
    amenities: "speaker,projector,AC",
    price: 2000,
  },
  {
    roomName: "Conference ",
    roomId: "03",
    seats: 75,
    amenities: "wifi,projector,AC,tables",
    price: 1250,
  },
];
const bookings = [
  {
    bookingId: 1,
    customerName: "suriya",
    roomId: "01",
    date: format(new Date("07-12-2023"), "dd-MMM-yyyy"),
    start: "08:00",
    end: "09:00",
    status: "confirmed",
  },
  {
    bookingId: 2,
    customerName: "udhaya",
    roomId: "02",
    date: format(new Date("07-14-2023"), "dd-MMM-yyyy"),
    start: "08:00",
    end: "09:00",
    status: "waiting for confirmation",
  },
  {
    bookingId: 3,
    customerName: "suriya",
    roomId: "03",
    date: format(new Date("07-12-2023"), "dd-MMM-yyyy"),
    start: "08:00",
    end: "09:00",
    status: "confirmed",
  },
];

//API Endpoint for App Home
app.get("/", (req, res) => {
  res.send("<h1>Hall Booking</h1>");
});

//API Endpoint for getting all details of Rooms
app.get("/rooms", (req, res) => {
  res.json(rooms);
});

//API Endpoint for adding details in Rooms
app.post("/rooms", (req, res) => {
  const { roomName, seats, amenities, price } = req.body;
  const room = { roomName, roomId: rooms.length + 1, seats, amenities, price };
  rooms.push(room);
  res.status(201).json({ message: "room added sucessfully" });
});

//API Endpoint for getting all details of bookings
app.get("/bookings", (req, res) => {
  res.json(bookings);
});

//API Endpoint for adding details in Bookings
app.post("/bookings", (req, res) => {
  const { customerName, date, start, end, roomId, status } = req.body;
  const bookingFilter = bookings.find(
    (room) => room.date == date && room.roomId == roomId && room.start == start
  );
  if (bookingFilter) {
    return res.status(404).json({ message: "Room already booked" });
  }
  let roomIdVerify = rooms.map((room) => (room = room.roomId));
  if (!roomIdVerify.includes(roomId)) {
    return res
      .status(404)
      .json({ message: "Requested room N/A, Kinldy check Other rooms" });
  }
  const booking = {
    bookingId: bookings.length + 1,
    customerName,
    date,
    start,
    end,
    roomId,
    status,
  };
  bookings.push(booking);
  res.status(201).json({ message: "booked sucessfully" });
});

//API Endpoint for listing all rooms with booked Data
app.get("/bookedRooms", (req, res) => {
  const BookedRoomDetails = bookings.map((book) => {
    roomsData = rooms.find((room) => room.roomId == book.roomId);
    if (book.status == "confirmed") {
      return {
        "Room Name": `${roomsData.roomName}`,
        "Booked Status": `${book.status}`,
        "Customer Name": `${book.customerName}`,
        Date: `${book.date}`,
        "Start Time": `${book.start}`,
        "End Time": `${book.end}`,
      };
    }
  });
  res.json(BookedRoomDetails.filter((e) => e != null));
});

//API Endpoint for listing all customers with booked Data
app.get("/customers", (req, res) => {
  const customerData = bookings.map((book) => {
    roomsData = rooms.find((room) => room.roomId == book.roomId);
    return {
      "Customer Name": `${book.customerName}`,
      "Room Name": `${roomsData.roomName}`,
      Date: `${book.date}`,
      "Start Time": `${book.start}`,
      "End Time": `${book.end}`,
    };
  });
  res.json(customerData);
});

//API Endpoint for listing no of times customer booked Data
app.get("/customers/:name", (req, res) => {
  const customerName = req.params.name;
  let allData = bookings.filter((book) => book.customerName == customerName);
  allData = allData.map((data) => {
    let room = rooms.find((e) => e.roomId == data.roomId);
    return {
      "Customer Name": `${data.customerName}`,
      "Room Name": `${room.roomName}`,
      Date: `${data.date}`,
      "Start Time": `${data.start}`,
      "End Time": `${data.end}`,
      "Booking id": `${data.bookingId}`,
      "Booking date": `${data.date}`,
      "Booking Status": `${data.status}`,
    };
  });
  if (allData.length) {
    res.json(allData);
  } else {
    res.status(404).json({
      message: "Request Customer details N/A or customer not yet booked rooms",
    });
  }
});

// adding listener
app.listen(2429, () => {
  console.log("server is running");
});