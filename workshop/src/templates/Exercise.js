import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

// import Layout from '../components/Layout';
import Layout from '../components/Layout/LayoutStyled';
import exercises from '../exercises';

const Exercise = ({ pageContext: { slug } }) => {
	const Exercise = exercises[slug];

	return (
		<Layout>
			<Suspense fallback="Loading">{Exercise ? <Exercise /> : 'Exercise not found...'}</Suspense>
		</Layout>
	);
};

Exercise.propTypes = { pageContext: PropTypes.shape({ slug: PropTypes.string }) };

export default Exercise;
