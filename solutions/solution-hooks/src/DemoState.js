import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Text } from '@workshop/ui-components';

// ifs, loops, name-convention
// useState
// useEffect - useApi
// useRef
// useCallback
const Tap = ({ a, b }) => {
	// all state
	useEffect(() => {
		console.log('A', { a, b });
	});

	// a state
	useEffect(
		() => {
			console.log('B', { a, b });
		},
		// eslint-disable-next-line
		[a]
	);

	// no state
	useEffect(
		() => {
			console.log('C', { a, b });
		},
		// eslint-disable-next-line
		[]
	);

	// clean-up
	useEffect(() => () => {}, []);

	return (
		<Text>
			{a} {b}
		</Text>
	);
};

const Demo = () => {
	const [a, setA] = useState(Math.random());
	const [b, setB] = useState(Math.random());

	return (
		<Fragment>
			<Button onClick={() => setA(Math.random())}>Generate A</Button>

			<Button onClick={() => setB(Math.random())}>Generate B</Button>

			<Tap a={a} b={b} />
		</Fragment>
	);
};

export default Demo;
