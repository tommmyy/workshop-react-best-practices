import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { Layout } from '../../components';
import * as types from '../../types';

import logo from './logo.svg';

import './App.css';

const App = ({ pages }) => (
	<Layout>
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Welcome to React Best Practices Workshop</p>
				<ul className="App-menu">
					{pages
						.filter(({ slug }) => slug.match(/exercise/))
						.sort()
						.map(({ slug }) => (
							<li key={slug}>
								<Link className="App-link" to={slug}>
									{slug}
								</Link>
							</li>
						))}
				</ul>
			</header>
		</div>
	</Layout>
);

App.propTypes = {
	pages: PropTypes.arrayOf(types.Page),
};

export default App;
