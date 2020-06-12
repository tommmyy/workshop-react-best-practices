import React from 'react';
import { Box } from '@workshop/ui-components';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { compose } from 'ramda';

const getDisplayName = (Component) => Component.displayName || Component.name || 'Component';

const withPropMapping = (mapping) => (NextComponent) => {
	const WithPropMapping = (props) => <NextComponent {...mapping(props)} />;

	WithPropMapping.displayName = `withPropMapping(${getDisplayName(NextComponent)})`;

	hoistNonReactStatics(WithPropMapping, NextComponent);

	return WithPropMapping;
};

const Logger = ({ ...props }) => <Box as="pre">{JSON.stringify(props, null, 2)}</Box>;
Logger.workshop = true;

const EnhancedLogger = compose(
	withPropMapping(
		(props) => ({ ...props, foo: true }) //
	),
	withPropMapping(
		({ data, ...rest }) => ({ ...rest, data, loading: !data }) //
	)
)(Logger);

const Exercise = () => (
	<Box>
		<EnhancedLogger otherProp="hello" data="data" />
	</Box>
);

export default Exercise;
