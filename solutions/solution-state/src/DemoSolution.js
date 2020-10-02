import React, { createContext, useContext, useReducer, useState } from 'react';
import { Box, Button, Col, Heading, Input, Label, Row, Text } from '@workshop/ui-components';
import { isNilOrEmpty, keyMirror } from 'ramda-extension';

// Action Creators
const ActionTypes = keyMirror({
	REQUEST: null,
	SUCCESS: null,
});

const request = (filterParams) => ({ type: ActionTypes.REQUEST, payload: filterParams });

const success = (payload) => ({ type: ActionTypes.SUCCESS, payload });

const apiUrl = 'https://api.github.com/repos/facebook/react/commits';

const fetchCommits = (dispatch) => async (filterParams) => {
	const { page, per_page } = filterParams;
	dispatch(request(filterParams));

	try {
		const response = await fetch(`${apiUrl}?per_page=${per_page}&page=${page}`);
		const data = await response.json();

		dispatch(success(data));
		return data;
	} catch (error) {
		// TODO:
	}
};

// 2b:
const ghReducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.REQUEST: {
			return {
				...state,
				status: 'pending',
			};
		}
		case ActionTypes.SUCCESS: {
			return {
				...state,
				data: action.payload,
				status: 'resolved',
			};
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
};

// 1 ---
const GhContext = createContext();

const GHProvider = (props) => {
	// 2a:
	const [state, dispatch] = useReducer(ghReducer, { data: null, status: null });

	return <GhContext.Provider {...props} value={{ state, dispatch }} />;
};

const useGHCommits = () => {
	const api = useContext(GhContext);

	if (!api) {
		throw new Error('useGHCommits must be used within a GHProvider');
	}

	return api;
};
// 1 ---end

const Display = () => {
	const { state } = useGHCommits();
	return (
		<Box as="ul" sx={{ listStyle: 'none' }} p={0}>
			{!isNilOrEmpty(state.data) &&
				state.data.map(({ sha, commit: { author, message } }) => (
					<Box as="li" key={sha} py={2}>
						<Heading>{author.name}</Heading>
						<Text> {message}</Text>
					</Box>
				))}
		</Box>
	);
};

const intialFormState = {
	per_page: 20,
	page: 0,
};
const TinyForm = () => {
	const {
		state: { status },
		dispatch,
	} = useGHCommits();

	const [formState, setFormState] = useState(intialFormState);

	const isPending = status === 'pending';

	const formChange = (event) => {
		const { value, name } = event.target;

		setFormState({ ...formState, [name]: value });
	};

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();

				fetchCommits(dispatch)(formState);
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

					<Button mb={3} type="submit" disabled={isPending}>
						Fetch me data
					</Button>

					<Text fontFamily="mono">{status}</Text>
				</Col>
			</Row>
		</form>
	);
};

const Exercise = () => (
	<GHProvider>
		<Box>
			<TinyForm />

			<Box as="hr" />

			<Display />
		</Box>
	</GHProvider>
);

export default Exercise;
