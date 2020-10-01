// - Containers vs. UI
// Provider/context
// reducer
// useGHCommits
// isPending
// fetchCommits
//
import React, { useState } from 'react';
import { Box, Button, Col, Heading, Input, Label, Row, Text } from '@workshop/ui-components';
// import { isNilOrEmpty, keyMirror } from 'ramda-extension';

const Display = () => <Box as="ul" sx={{ listStyle: 'none' }} p={0} />;

const intialFormState = {
	per_page: 20,
	page: 0,
};
const TinyForm = () => {
	const [formState, setFormState] = useState(intialFormState);

	const formChange = (event) => {
		const { value, name } = event.target;

		setFormState({ ...formState, [name]: value });
	};

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
			}}
		>
			<Row>
				<Col span={[12, 12, 6]}>
					<Heading>Github Facebook History</Heading>

					<Label htmlFor="page">Page:</Label>
					<Input
						type="number"
						mb={3}
						id="page"
						value={formState.page}
						name="page"
						onChange={formChange}
					/>

					<Label htmlFor="perPage">Per page:</Label>
					<Input
						id="perPage"
						type="number"
						value={formState.per_page}
						name="per_page"
						onChange={formChange}
					/>

					<Button mb={3} type="submit">
						Fetch me data
					</Button>

					<Text fontFamily="mono">{status}</Text>
				</Col>
			</Row>
		</form>
	);
};

const Exercise = () => (
	<Box>
		<TinyForm />

		<Box as="hr" />

		<Display />
	</Box>
);

export default Exercise;
