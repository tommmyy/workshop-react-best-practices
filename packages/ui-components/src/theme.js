import { system } from '@theme-ui/presets';

const gutters = [2, 3, 4];

const theme = {
	...system, //
	grid: {
		container: {
			px: gutters,
		},
		gutters,
		maxColumns: 12,
	},
};

export default theme;
