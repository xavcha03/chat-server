const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors()); // Add cors middleware

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "https://remarkable-churros-2388f7.netlify.app/",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("user connected");

	socket.on("room1", (datas) => {
		console.log("SERVER : GET DATAS : " + datas);

		io.emit("room1", datas);
	});
});

app.get("/", (req, res) => {
	console.log("GET");
	res.send("hello world");
});

server.listen(4000, () => "Server is running on port 4000");
