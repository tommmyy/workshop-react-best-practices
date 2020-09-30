import React from 'react';
import PropTypes from 'prop-types';

import { App } from '../containers';
import * as types from '../types';

const Index = ({ pageContext: { pages } }) => <App pages={pages} />;

Index.propTypes = {
	pageContext: PropTypes.shape({
		pages: PropTypes.arrayOf(types.Page),
	}),
};

export default Index;
