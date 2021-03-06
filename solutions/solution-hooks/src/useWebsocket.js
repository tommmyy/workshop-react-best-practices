import React, { useCallback, useEffect, useRef, useState } from 'react';

const useCommitedRef = (value) => {
	const ref = useRef(value);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref;
};

const noop = () => {};

const useWebsocket = ({
	url,
	onClose: onCloseProp = noop,
	onError: onErrorProp = noop,
	onOpen: onOpenProp = noop,
	onMessage: onMessageProp = noop,
}) => {
	const ws = useRef();

	const onMessage = useCommitedRef(onMessageProp);
	const onClose = useCommitedRef(onCloseProp);
	const onError = useCommitedRef(onErrorProp);
	const onOpen = useCommitedRef(onOpenProp);

	const setupWs = useCallback(() => {
		ws.current = new WebSocket(url);
		ws.current.onmessage = (resp) => onMessage.current(JSON.parse(resp.data));

		ws.current.onopen = (...args) => {
			onOpen.current(...args);
		};

		ws.current.onerror = (error) => {
			console.log(error);

			onError.current(error);
		};

		ws.current.onclose = (...args) => {
			onClose.current(...args);
		};
		// }, [onClose, onError, onMessage, onOpen, url]);
	}, [url]);

	const close = () => {
		if (ws.current) {
			ws.current.close();
		}
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
