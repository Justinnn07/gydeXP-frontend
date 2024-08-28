const express = require("express");
const http = require("http");
const { initDb } = require("./models");
const authRoutes = require("./routes/authRoutes");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use("/auth", authRoutes);

initDb();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.onAny((eventName, ...args) => {
    console.log(`Received event ${eventName} with args:`, args);
  });

  socket.on("locationUpdate", (data) => {
    console.log("Location update received:", data);

    socket.broadcast.emit("locationUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
