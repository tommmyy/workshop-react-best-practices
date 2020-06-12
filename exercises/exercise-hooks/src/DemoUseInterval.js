import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Text } from '@workshop/ui-components';

// const useInterval = (callback, interval) => {
// 	if (interval) {
// 		setInterval(callback, interval);
// 	}
// };

// const useInterval = (callback, interval) => {
// 	useEffect(() => {
// 		if (interval != null) {
// 			setInterval(callback, interval);
// 		}
// 	}, [callback, interval]);
// };
//
//
const useInterval = (callback, interval) => {
	const cbRef = useRef(callback);

	useEffect(() => {
		cbRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (interval != null) {
			const id = setInterval(cbRef.current, interval);

			return () => clearInterval(id);
		}
	}, [interval]);
};

// Custom hook - useInterval
const Demo = () => {
	const [counter, setCounter] = useState(0);
	const [interval, setInterval] = useState(null);

	useInterval(() => {
		console.log('tick');
		setCounter((x) => x + 1);
	}, interval);

	const handleClick = () => setInterval(interval ? null : 2000);

	return (
		<Box>
			<Text>{counter}</Text>
			<Text>
				<Button onClick={handleClick}>Toggle inteval</Button>
			</Text>
		</Box>
	);
};

export default Demo;
