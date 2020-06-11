import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Col,
	Container,
	Flex,
	Heading,
	Row,
	ThemeProvider,
	useThemeUI,
} from '@workshop/ui-components';
import * as presets from '@theme-ui/presets';
import { indexOf, keys, mergeDeepLeft } from 'ramda';

const createTheme = mergeDeepLeft({
	grid: {
		maxColumns: 12,
		gutters: 2,
	},
});

const availableThemes = keys(presets);

const Switcher = ({ theme, onChangeTheme }) => {
	const { setColorMode, colorMode, ...rest } = useThemeUI();
	// console.log(rest);
	console.log(rest.theme.buttons);

	const handleOnClickTheme = () => {
		const index = indexOf(theme, availableThemes);
		if (index === -1) {
			return;
		}

		const nextIndex = (index + 1) % availableThemes.length;

		return onChangeTheme(availableThemes[nextIndex]);
	};

	const handleOnClickMode = () => setColorMode(colorMode === 'dark' ? 'light' : 'dark');

	return (
		<Flex>
			<Button onClick={handleOnClickTheme}>{theme}</Button>

			<Button sx={{ ml: 2 }} onClick={handleOnClickMode}>
				{colorMode}
			</Button>
		</Flex>
	);
};
Switcher.propTypes = {
	onChangeTheme: PropTypes.func,
	theme: PropTypes.string,
};

const ThemeUi = () => {
	const [theme, setTheme] = useState('system');

	return (
		<ThemeProvider theme={createTheme(presets[theme])}>
			<Container>
				<Row>
					<Col span={12}>
						<Switcher
							theme={theme}
							onChangeTheme={(newTheme) => {
								setTheme(newTheme);
							}}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Heading>Grid</Heading>
					</Col>
				</Row>
				<Row>
					<Col span={6}>half</Col>
					<Col span={6}>half</Col>
				</Row>
				<Row>
					<Col span={6}>half</Col>
					<Col span={6}>half</Col>
				</Row>
			</Container>
		</ThemeProvider>
	);
};

export default ThemeUi;
