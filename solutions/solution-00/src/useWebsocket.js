import React, { useEffect, useRef } from 'react';

const useWebsocket = ({ url }) => {
	const wsRef = useRef();

	const connect = () => {
		wsRef.current = new WebSocket(url);
	};

	const close = () => {};
	const onMessage = () => {};

	return {
		connect,
		close,
		onMessage,
	};
};

const Example = () => {
	const { connect, close } = useWebsocket({
		url: 'ws://localhost:8001',
		onMessage: (message) => {
			console.log(message);
		},
	});

	useEffect(() => {
		connect();
	}, []);

	return <div>Example</div>;
};

export default Example;
