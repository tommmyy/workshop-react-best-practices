import React from 'react';
import { Box, Button, Flex, Heading, Text, ThemeProvider } from 'theme-ui';
import { system, tailwind } from '@theme-ui/presets';
import { mergeDeepLeft } from 'ramda';

// components - Flex, Box, Text, Heading
// sx
// responsiveprops
// ThemeProvider - use base or tailwind -> System
// add theme factory
// custom variants for Button, nav link

const createTheme = (base) =>
	mergeDeepLeft(
		{
			links: {
				nav: {
					color: 'secondary',
				},
			},
		},
		base
	);

console.log(tailwind);
const DemoThemeUi = () => (
	<ThemeProvider theme={createTheme(tailwind)}>
		<Flex
			sx={{
				p: [1, 2, 4],
				flexDirection: ['column', 'column', 'row'],
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Heading>Text</Heading>
			<Text sx={{ color: 'primary' }}>Text</Text>
			<Box>Box</Box>
			<Button variant="elevated">Button</Button>
			<Text variant="links.nav">custom variant</Text>
		</Flex>
	</ThemeProvider>
);

export default DemoThemeUi;
