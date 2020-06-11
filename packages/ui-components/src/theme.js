import { tailwind } from '@theme-ui/presets';

const gutters = [2, 3, 4];

export default {
	...tailwind, //
	grid: {
		container: {
			px: gutters,
		},
		gutters,
		maxColumns: 12,
	},
};
