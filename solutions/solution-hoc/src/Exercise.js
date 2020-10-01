import React, { Suspense } from 'react';
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

const withFallback = ({ getControlProp, fallback }) => (NextComponent) => {
	const WithFallback = (props) => (getControlProp(props) ? fallback : <NextComponent {...props} />);

	WithFallback.displayName = `withFallback(${getDisplayName(NextComponent)})`;

	hoistNonReactStatics(WithFallback, NextComponent);

	return WithFallback;
};

const withSuspense = (fallback) => (NextComponent) => {
	const withSuspense = (props) => (
		<Suspense fallback={fallback}>
			<NextComponent {...props} />
		</Suspense>
	);

	withSuspense.displayName = `withSuspense(${getDisplayName(NextComponent)})`;

	hoistNonReactStatics(withSuspense, NextComponent);

	return withSuspense;
};

const Logger = ({ ...props }) => <Box as="pre">{JSON.stringify(props, null, 2)}</Box>;
Logger.workshop = true;

const EnhancedLogger = compose(
	withPropMapping(
		(props) => ({ ...props, foo: true }) //
	),
	withPropMapping(
		({ data, ...rest }) => ({ ...rest, data, loading: !data }) //
	),
	withSuspense(<div>Suspended</div>),
	withFallback({ getControlProp: ({ loading }) => !!loading, fallback: <div>Waiting</div> })
)(Logger);

const Exercise = () => (
	<Box>
		<EnhancedLogger otherProp="hello" data="data" />
	</Box>
);

export default Exercise;
