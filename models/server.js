//?Servidor Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		//? Http Server
		this.server = http.createServer(this.app);

		//?Configuración del socket server
		this.io = socketio(this.server, {
			/* configuraciones */
		});
	}

	middlewares() {
		//?Desplegar el directorio publico
		this.app.use(express.static(path.resolve(__dirname, "../public")));

		//?CORDS
		this.app.use(cors());
	}

	configurarSockets() {
		new Sockets(this.io);
	}

	execute() {
		//!Inicializar middlewares
		this.middlewares();

		//! Configurar Sockets
		this.configurarSockets();

		//!Inicializar server
		this.server.listen(this.port, () => {
			console.log("Server corriendo en el puerto: ", this.port);
		});
	}
}

module.exports = Server;
