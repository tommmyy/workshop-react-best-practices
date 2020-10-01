// Custom hook - useInterval
// Syncing with useRef

import React, { useEffect, useState } from 'react';
import { Box, Button, Text } from '@workshop/ui-components';

const useInterval = (callback, interval) => {
	if (interval) {
		setInterval(callback, interval);
	}
};

const CounterApp = ({ random }) => {
	const [counter, setCounter] = useState(0);
	const [interval, setInterval] = useState(null);

	useInterval(() => {
		console.log('counter', counter, random);

		setCounter((x) => x + 1);
	}, interval);

	const handleClick = () => setInterval(interval ? null : 2000);

	return (
		<Box>
			<Text>{counter}</Text>
			<Text>
				<Button onClick={handleClick}>Toggle interval</Button>
			</Text>
		</Box>
	);
};

const Demo = () => {
	const [random, setRandom] = useState(0);

	useEffect(() => {
		const id = setTimeout(() => {
			setRandom(Math.random());
		}, 1000);

		return () => clearTimeout(id);
	});

	return <CounterApp random={random} />;
};

export default Demo;
