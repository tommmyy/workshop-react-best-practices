import React, { useCallback, useEffect, useRef, useState } from 'react';

function useInterval(callback, delay) {
	const savedCallback = useRef();

	// Remember the latest function.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}
const noop = () => {};

const useWebsocket = ({
	url,
	onClose: onCloseProp = noop,
	onError: onErrorProp = noop,
	onOpen: onOpenProp = noop,
	onMessage: onMessageProp = noop,
}) => {
	const wsRef = useRef();
	const onMessage = useRef(onMessageProp);
	const onClose = useRef(onCloseProp);
	const onError = useRef(onErrorProp);
	const onOpen = useRef(onOpenProp);

	const [reconnectionInterval, setReconnectionInterval] = useState(null);
	const reconnectionAttemtsRemaining = useRef(0);

	useEffect(() => {
		onMessage.current = onMessageProp;
		onClose.current = onCloseProp;
	});

	const setupWs = useCallback(() => {
		// if (!reconnectionAttemtsRemaining.current) {
		// 	setReconnectionInterval(null);
		// 	return;
		// }
		console.log(`remaining: ${reconnectionAttemtsRemaining.current}`);

		// reconnectionAttemtsRemaining.current = reconnectionAttemtsRemaining.current - 1;

		wsRef.current = new WebSocket(url);
		wsRef.current.onmessage = (resp) => onMessage.current(JSON.parse(resp.data));

		wsRef.current.onopen = (...args) => {
			// reconnectionAttemtsRemaining.current = 5;
			setReconnectionInterval(null);
			onOpen.current(...args);
		};

		wsRef.current.onerror = (error) => {
			console.log(error);

			onError.current(error);
			setReconnectionInterval(2000);
		};

		wsRef.current.onclose = (...args) => {
			// if (!reconnectionAttemtsRemaining.current) {
			if (!reconnectionInterval) {
				onClose.current(...args);
			}
		};
	}, [reconnectionInterval, url]);

	useInterval(() => {
		setupWs();
	}, reconnectionInterval);

	const connect = useCallback(() => {
		if (wsRef.current) {
			wsRef.current.close();
		}
		setReconnectionInterval(null);
		// reconnectionAttemtsRemaining.current = 5;

		setupWs();
	}, [setupWs]);

	const close = () => {
		if (wsRef.current) {
			wsRef.current.close();
		}
		setReconnectionInterval(null);
	};

	const send = (frame) => {
		if (wsRef.current) {
			wsRef.current.send(frame);
		}
	};

	return {
		connect,
		close,
		send,
	};
};

const endpoints = ['/v1', '/v2'];

// useRef -> to point to the onMessage and onClose
// connect as custom method
const Example = () => {
	const [numberOfClients, setNumberOfClients] = useState();
	const [url, setUrl] = useState(endpoints[0]);

	const { connect, close, status } = useWebsocket({
		url: process.env.GATSBY_API_URL_WS + url,
		onMessage: (message) => {
			setNumberOfClients(message.numberOfClients);
		},
		onClose: () => {
			setNumberOfClients(null);
		},
	});

	useEffect(() => {
		connect();
	}, [connect]);

	return (
		<section>
			<div>Status: {status}</div>
			<div>Endpoint: {url}</div>
			<div>Number of connected clients: {numberOfClients}</div>

			<div>
				<label htmlFor="url">
					<select
						id="url"
						onChange={(event) => {
							setUrl(event.target.value);
						}}
						value={url}
					>
						{endpoints.map((value) => (
							<option key={value} value={value}>
								{value}
							</option>
						))}
					</select>
				</label>
			</div>

			<button onClick={() => connect()}>Connect</button>
			<button onClick={() => close()}>Close</button>
		</section>
	);
};

export default Example;
