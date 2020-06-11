const { createServer } = require('http');

const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const { env } = require('@workshop/config');

const app = express();
const server = createServer(app);
const websocketServer = new WebSocket.Server({ server });

app.use(cors());

const state = { clients: [], id: null };

const notifyClients = (state) => {
	state.clients.forEach((client) => {
		client.send(
			JSON.stringify({
				numberOfClients: state.clients.length,
			})
		);
	});
};

websocketServer.on('connection', (ws) => {
	state.clients = [...state.clients, ws];

	notifyClients(state);

	ws.on('close', () => {
		state.clients = state.clients.filter((x) => x !== ws);

		notifyClients(state);
	});
});

const PORT = env.SERVER_PORT || 8081;

server.listen(PORT, () => console.log(`Example of server listening on port ${PORT}!`));
