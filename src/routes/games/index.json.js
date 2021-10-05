import { readdirSync } from 'fs';
import capitalize from 'lodash/capitalize';

const getDirectories = (source) =>
	readdirSync(source, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

export async function get() {
	const games = getDirectories('./src/games').reduce((titleMap, key) => {
		const title = key
			.split('-')
			.map((word) => capitalize(word))
			.join(' ');
		return { ...titleMap, [key]: title };
	}, {});
	return {
		body: games
	};
}
