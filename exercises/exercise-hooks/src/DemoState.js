import React, { Fragment, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Text } from '@workshop/ui-components';

// ifs, loops, name-convention
// useState
// useEffect - použití
// useRef
const Tap = ({ a, b }) => (
	<Text>
		{a} {b}
	</Text>
);
Tap.propTypes = {
	a: PropTypes.number,
	b: PropTypes.number,
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
