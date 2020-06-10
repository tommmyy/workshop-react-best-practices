const { browser: env } = require('@workshop/config');

const { author } = require('./package.json');

const { GATSBY_API_URL_WS } = env;

process.env.GATSBY_API_URL_WS = GATSBY_API_URL_WS;

const siteMetadata = {
	author,
	description: '',
	title: 'React Best Practices',
};

module.exports = {
	siteMetadata,
};
