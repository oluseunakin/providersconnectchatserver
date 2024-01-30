import { Server } from "socket.io";

const socketServer = new Server({cors: {origin: "http://localhost:3000"}});

socketServer.on("connection", (socket) => {
  console.log("Client has connected");

  socket.on("join", (id) => {
    socket.join(id);
  });

  socket.on("msg from sender", (count, receiver, message, sender) => {
    socketServer.in(receiver).emit("msg to receiver", count, receiver, message, sender);
  });
});

socketServer.on("disconnection", () => {
  console.log("Client has disconnected")
})

socketServer.listen(5000, () => {
    console.log("Socket Server is up")
});

