import React from 'react';
import PropTypes from 'prop-types';
import { mapResponsiveProperty } from '@workshop/utils';
import { Box, Flex, ThemeProvider, useThemeUI } from 'theme-ui';
import * as presets from '@theme-ui/presets';
import { mergeDeepLeft } from 'ramda';

const createTheme = mergeDeepLeft({
	grid: {
		maxColumns: 12,
		gutters: 2,
	},
});

const spanToWidth = (maxColumns) => (columnSpan) => `${(columnSpan / maxColumns) * 100}%`;

const Col = ({ sx, span, maxColumns: maxColumnsProp, ...rest }) => {
	const { theme: { grid: { maxColumns, gutters = 2 } = {} } = {} } = useThemeUI();

	return (
		<Box
			sx={{
				px: gutters,
				width: mapResponsiveProperty(
					spanToWidth(maxColumnsProp != null ? maxColumns : maxColumnsProp),
					span
				),
				...sx,
			}}
			{...rest}
		/>
	);
};
Col.propTypes = {
	maxColumns: PropTypes.number,
	span: PropTypes.any,
	sx: PropTypes.object,
};

const Row = ({ sx, ...rest }) => {
	const { theme: { grid: { gutters } = {} } = {} } = useThemeUI();

	return <Flex sx={{ mx: -gutters, ...sx }} {...rest} />;
};
Row.propTypes = { sx: PropTypes.object };

const Container = ({ sx, ...rest }) => <Box sx={{ mx: 'auto', width: '100%', ...sx }} {...rest} />;

Container.propTypes = { sx: PropTypes.object };

const ThemeUi = () => (
	<ThemeProvider theme={createTheme(presets.system)}>
		<Container>
			<Row>
				<Col span={[12, 12, 6]}>half</Col>
				<Col span={6}>half</Col>
			</Row>
			<Row>
				<Col span={6}>half</Col>
				<Col span={6}>half</Col>
			</Row>
		</Container>
	</ThemeProvider>
);

export default ThemeUi;
