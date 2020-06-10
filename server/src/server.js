const { createServer } = require('http');
const url = require('url');

const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const { env } = require('@workshop/config');

const app = express();
const server = createServer(app);

app.use(cors());

const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });

const initialState = { clients: [], id: null };

const state = { v1: { ...initialState }, v2: { ...initialState } };

const notifyClients = (state) => {
	state.clients.forEach((client) => {
		client.send(
			JSON.stringify({
				numberOfClients: state.clients.length,
			})
		);
	});
};

wss1.on('connection', (ws) => {
	state.v1.clients = [...state.v1.clients, ws];

	console.log('connection v1', state);

	notifyClients(state.v1);

	ws.on('close', () => {
		state.v1.clients = state.v1.clients.filter((x) => x !== ws);
		console.log('closing v1', state);

		notifyClients(state.v1);
	});
});

wss2.on('connection', (ws) => {
	state.v2.clients = [...state.v2.clients, ws];

	console.log('connection v2', state);

	notifyClients(state.v2);

	ws.on('close', () => {
		state.v2.clients = state.v2.clients.filter((x) => x !== ws);
		console.log('closing v2', state);
		notifyClients(state.v2);
	});
});

server.on('upgrade', function upgrade(request, socket, head) {
	const pathname = url.parse(request.url).pathname;

	if (pathname === '/v1') {
		wss1.handleUpgrade(request, socket, head, function done(ws) {
			wss1.emit('connection', ws, request);
		});
	} else if (pathname === '/v2') {
		wss2.handleUpgrade(request, socket, head, function done(ws) {
			wss2.emit('connection', ws, request);
		});
	} else {
		socket.destroy();
	}
});

const PORT = env.SERVER_PORT || 8081;

server.listen(PORT, () => console.log(`Example of server listening on port ${PORT}!`));
