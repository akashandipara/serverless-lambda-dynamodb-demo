import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
// import { getPosts } from './getPosts.ts';

const app = express();
app.use(express.static('public'));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.get("/home", (req, res) => {
  res.render("home");
})
io.on("connection", (socket) => {
  console.log("user created:", socket.id)
  // console.log(getPosts)
  // socket.emit("posts", getPosts);
});


httpServer.listen(8088, () => {
  console.log("Server running on port 8088");
})