import React, { useCallback, useEffect, useRef, useState } from 'react';

const useCommitedRef = (value) => {
	const ref = useRef(value);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref;
};

// 2a. Reconnection
// const useInterval = (callback, delay) => {
// 	const callbackRef = useCommitedRef(callback);

// 	useEffect(() => {
// 		if (delay != null && callbackRef.current) {
// 			const tick = () => {
// 				callbackRef.current();
// 			};
// 			const id = setInterval(tick, delay);

// 			return () => {
// 				clearInterval(id);
// 			};
// 		}
// 	}, [delay]);
// };

const noop = () => {};

const useWebsocket = ({
	url,
	onClose: onCloseProp = noop,
	onError: onErrorProp = noop,
	onOpen: onOpenProp = noop,
	onMessage: onMessageProp = noop,
	// reconnectionIntervalMs = 5000,
}) => {
	const ws = useRef();
	// 2c. reconnection
	// const [reconnectionInterval, setReconnectionInterval] = useState(null);

	const onMessage = useCommitedRef(onMessageProp);
	const onClose = useCommitedRef(onCloseProp);
	const onError = useCommitedRef(onErrorProp);
	const onOpen = useCommitedRef(onOpenProp);

	const setupWs = useCallback(() => {
		ws.current = new WebSocket(url);
		ws.current.onmessage = (resp) => onMessage.current(JSON.parse(resp.data));

		ws.current.onopen = (...args) => {
			// 2d. reconnection
			// setReconnectionInterval(null);
			onOpen.current(...args);
		};

		ws.current.onerror = (error) => {
			console.log(error);

			onError.current(error);
			// 2e. reconnection
			// setReconnectionInterval(reconnectionIntervalMs);
		};

		ws.current.onclose = (...args) => {
			// 2f. reconnection
			// if (!reconnectionInterval) {
			// 	onClose.current(...args);
			// }
			onClose.current(...args);
		};
	}, [onClose, onError, onMessage, onOpen, url]);
	// 2g.
	// }, [onClose, onError, onMessage, onOpen, reconnectionInterval, reconnectionIntervalMs, url]);

	// 2b. reconnection
	// useInterval(() => {
	// 	setupWs();
	// }, reconnectionInterval);

	const close = () => {
		if (ws.current) {
			ws.current.close();
		}
		// 2h.
		// setReconnectionInterval(null);
	};

	const connect = useCallback(() => {
		close();

		setupWs();
	}, [setupWs]);

	const send = (frame) => {
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			ws.current.send(JSON.stringify(frame));
		}
	};

	useEffect(() => () => close(), []);

	return {
		connect,
		close,
		send,
		ws,
	};
};

const endpoints = ['/v1', '/v2'];

const Example = () => {
	const [numberOfClients, setNumberOfClients] = useState();
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [url, setUrl] = useState(endpoints[0]);

	const { connect, close, send } = useWebsocket({
		url: process.env.GATSBY_API_URL_WS + url,
		onMessage: (message) => {
			setNumberOfClients(message.numberOfClients);
			setMessages(message.messages);
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
			<button type="button" onClick={() => connect()}>
				Connect
			</button>
			<button type="button" onClick={() => close()}>
				Close
			</button>

			<hr />

			<form
				onSubmit={(event) => {
					event.preventDefault();

					send({ message });
					setMessage('');
				}}
			>
				<div>
					<label htmlFor="message">Message</label>
					<input
						id="message"
						value={message}
						onChange={(event) => setMessage(event.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="url">URL:</label>
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
				</div>

				<button type="submit">Send</button>
			</form>

			<hr />
			<div>Number of connected clients: {numberOfClients}</div>
			<pre>{JSON.stringify(messages, null, 2)}</pre>
		</section>
	);
};

export default Example;
