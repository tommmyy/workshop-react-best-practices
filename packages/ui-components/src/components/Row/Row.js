import React from 'react';
import PropTypes from 'prop-types';
import { Flex, useThemeUI } from 'theme-ui';
import { mapResponsiveProperty } from '@workshop/utils';

const Row = ({ sx, ...rest }) => {
	const { theme: { grid: { gutters } = {} } = {} } = useThemeUI();

	return (
		<Flex
			sx={{ mx: mapResponsiveProperty((x) => -x, gutters), flexWrap: 'wrap', ...sx }}
			{...rest}
		/>
	);
};
Row.propTypes = { sx: PropTypes.object };

export default Row;
