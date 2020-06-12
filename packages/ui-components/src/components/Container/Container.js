import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'theme-ui';

const Container = ({ sx, ...rest }) => (
	<Box variant="grid.container" sx={{ mx: 'auto', width: '100%', ...sx }} {...rest} />
);

Container.propTypes = { sx: PropTypes.object };

export default Container;
