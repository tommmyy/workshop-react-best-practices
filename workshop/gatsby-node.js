const { keys, replace, filter, map, compose, test } = require('ramda');
const fs = require('fs-extra');

const { dependencies } = require('./package.json');

const pages = compose(
	map((page) => ({
		page,
		slug: replace(/@workshop\//, '')(page),
	})),
	filter(test(/^\@workshop/)),
	keys
)(dependencies);

console.log({ pages });

exports.createPages = async ({ actions }) => {
	const { createPage } = actions;

	pages.forEach(({ slug, page }) => {
		const exercise = require.resolve('./src/templates/Exercise.js');

		createPage({
			path: slug,
			component: exercise,
			context: {
				slug,
				page,
			},
		});
	});

	return null;
};

exports.onCreatePage = ({ page, actions }) => {
	const { createPage, deletePage } = actions;

	deletePage(page);
	createPage({
		...page,
		context: {
			...page.context,
			pages,
		},
	});
};

exports.onPreBootstrap = ({ reporter }) => {
	reporter.info('Bootstraping the `exercises.js` file.');

	const content = `/* IMPORTANT: The file is generated. */
import { lazy } from 'react';

export default {
${pages.map(({ page, slug }) => `\t'${slug}': lazy(() => import('${page}')),`).join('\n')}
};`;
	fs.writeFileSync('./src/exercises.js', content, 'utf8');
};
