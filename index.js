const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const async_hooks = require('async_hooks');

app.use(cors()); // Add cors middleware

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://192.168.0.10:5173",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("user connected");

	socket.on("room1", (datas) => {
		//console.log("SERVER : GET DATAS : " + datas);
		console.table({
			datas,
		});

		io.emit("room1", datas);
	});
});

app.get("/", (req, res) => {
	res.send("hello world");
});

server.listen(4000, () => "Server is running on port 4000");
