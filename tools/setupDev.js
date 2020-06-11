/* eslint-disable no-console */

const path = require('path');

const fs = require('fs-extra');
const chalk = require('chalk');

const rootDir = path.join(__dirname, '..');

const log = console.log;

const configEnvPath = path.join(rootDir, 'packages', 'config', '.env');

const run = async () => {
	log(chalk.blue.bold('Creating `.env` file...'));
	log(
		chalk.yellow(
			'This will set the environment properties that are necessary for running the project.'
		)
	);

	await fs.copy(path.join(rootDir, '.env-sample'), configEnvPath);
	await fs.ensureLink(configEnvPath, path.join(rootDir, '.env'));
};

/**
 * Setup additional files for local development.
 */
run();
