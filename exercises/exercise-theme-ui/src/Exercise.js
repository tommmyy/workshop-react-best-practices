import React from 'react';
import { Box, ThemeProvider } from 'theme-ui';
import { base } from '@theme-ui/presets';
import { mergeDeepRight } from 'ramda';

const theme = mergeDeepRight(base, {
	// TODO: your stuff
});

const Exercise = () => (
	<ThemeProvider theme={theme}>
		<Box>Sandbox</Box>
	</ThemeProvider>
);

export default Exercise;
