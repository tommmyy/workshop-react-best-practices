// step  2- Solution - using workshop/ui-components
// switch to Layout from '../components/Layout/LayoutStyled';

import React from 'react';
import { Col, Container, Heading, Row, ThemeProvider } from '@workshop/ui-components';
import * as presets from '@theme-ui/presets';
import { mergeDeepLeft } from 'ramda';

const createTheme = mergeDeepLeft({
	grid: {
		maxColumns: 12,
		gutters: 2,
	},
});

const ThemeUi = () => (
	<ThemeProvider theme={createTheme(presets.system)}>
		<Container sx={{ p: 4 }}>
			<Row>
				<Col span={12}>
					<Heading>Grid</Heading>
				</Col>
			</Row>
			<Row>
				<Col span={[12, 6]}>half</Col>
				<Col span={[12, 6]}>half</Col>
			</Row>
			<Row>
				<Col span={6}>half</Col>
				<Col span={6}>half</Col>
			</Row>
		</Container>
	</ThemeProvider>
);

export default ThemeUi;
