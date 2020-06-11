import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import { Box, useThemeUI } from 'theme-ui';
import { mapResponsiveProperty } from '@workshop/utils';

const spanToWidth = (maxColumns) => (columnSpan) => `${(columnSpan / maxColumns) * 100}%`;

const Col = ({ sx, span, maxColumns: maxColumnsProp, ...rest }) => {
	const { theme: { grid: { maxColumns, gutters = 2 } = {} } = {} } = useThemeUI();

	return (
		<Box
			sx={{
				px: gutters,
				width: mapResponsiveProperty(
					spanToWidth(isNil(maxColumnsProp) ? maxColumns : maxColumnsProp),
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

export default Col;
