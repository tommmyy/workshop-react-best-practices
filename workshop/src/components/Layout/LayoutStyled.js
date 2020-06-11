import React from 'react';
import PropTypes from 'prop-types';
import { Container, ThemeProvider, theme } from '@workshop/ui-components';

const Layout = ({ children, ...rest }) => (
	<ThemeProvider theme={theme} {...rest}>
		<Container variant="grid.container">{children}</Container>
	</ThemeProvider>
);

Layout.propTypes = {
	children: PropTypes.node,
};

export default Layout;
