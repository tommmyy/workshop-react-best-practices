import React from 'react';
import { map, times, uniq } from 'ramda';
import { Box, Card, Text } from '@workshop/ui-components';

import pokedex from './pokedex.json';

const RandomData = ({ data, maxSize = 10, children }) => {
	const getRandomIndex = () => Math.floor(Math.random() * data.length);
	const indices = uniq(times(getRandomIndex, maxSize));

	return map((i) => children(data[i]))(indices);
};

const Exercise = () => (
	<Box>
		<RandomData data={pokedex}>
			{({ name: { english: name }, id }) => (
				<Card key={id}>
					<Text>{name}</Text>
				</Card>
			)}
		</RandomData>
	</Box>
);

export default Exercise;
