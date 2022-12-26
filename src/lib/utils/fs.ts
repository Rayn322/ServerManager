import { readDir, readTextFile } from '@tauri-apps/api/fs';
import { parse } from 'ini';

export async function isFolderEmpty(folder: string) {
	let files = await readDir(folder);
	return files.length === 0;
}

export async function readPropertiesFile(path: string) {
	let file = await readTextFile(path);
	return parse(file);
}
