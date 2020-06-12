import React from 'react';
import { Box } from 'theme-ui';

const Logger = ({ ...props }) => <Box as="pre">{JSON.stringify(props, null, 2)}</Box>;
Logger.workshop = true;

// withPropMapping
// getDisplayName
// hoistNonReactStatics
// compose - order
const Demo = () => (
	<Box>
		<Logger data="data" />
	</Box>
);

export default Demo;
