const path = require('path');

const envalid = require('envalid');
const { isEmpty } = require('ramda');

const { num, url } = envalid;

const reporter = ({ errors }) => {
	if (!isEmpty(errors)) {
		console.log(`Invalid env vars: ${Object.keys(errors)}`);
	}
};

const options = {
	reporter,
	dotEnvPath: path.join(__dirname, '../.env'),
};

module.exports.env = envalid.cleanEnv(
	process.env,
	{
		SERVER_PORT: num(),
	},
	options
);

module.exports.browser = envalid.cleanEnv(
	process.env,
	{
		GATSBY_API_URL_WS: url(),
	},
	options
);
