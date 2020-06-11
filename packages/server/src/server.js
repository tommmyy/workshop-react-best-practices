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

const initialState = { clients: [], messages: [], id: null };

const state = { v1: { ...initialState }, v2: { ...initialState } };

const notifyClients = (state) => {
	state.clients.forEach((client) => {
		client.send(
			JSON.stringify({
				numberOfClients: state.clients.length,
				messages: state.messages,
			})
		);
	});
};

const makeServer = (id) => (ws) => {
	state[id].clients = [...state[id].clients, ws];

	console.log(`connection ${id}`, state);

	notifyClients(state[id]);

	ws.on('message', (data) => {
		const parsed = JSON.parse(data);

		state[id].messages = [...state[id].messages, parsed.message];

		notifyClients(state[id]);
	});

	ws.on('close', () => {
		state[id].clients = state[id].clients.filter((x) => x !== ws);

		console.log(`closing ${id}`);
		notifyClients(state[id]);
	});
};

// bit of duplicity never hurts
wss1.on('connection', makeServer('v1'));
wss2.on('connection', makeServer('v2'));

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
