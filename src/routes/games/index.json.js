import { readdirSync } from 'fs';

const getDirectories = (source) =>
	readdirSync(source, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

export async function get() {
	return {
		body: getDirectories('./src/games')
	};
}
