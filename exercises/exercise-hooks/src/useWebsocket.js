import React, { useCallback, useEffect, useRef, useState } from 'react';

const useInterval = (callback, delay) => {
	const callbackRef = useRef(callback);
	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (delay != null && callbackRef.current) {
			const id = setInterval(() => callbackRef.curent(), delay);

			return () => {
				clearInterval(id);
			};
		}
	}, [delay]);
};

const noop = () => {};

const useCommitedRef = (value) => {
	const ref = useRef(value);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref;
};

const useWebsocket = ({
	url,
	onClose: onCloseProp = noop,
	onError: onErrorProp = noop,
	onOpen: onOpenProp = noop,
	onMessage: onMessageProp = noop,
	reconnectionIntervalMs = 5000,
}) => ({
		connect: noop,
		close: noop,
		send: noop,
	});

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

	return (
		<section>
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
