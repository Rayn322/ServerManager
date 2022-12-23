import { readDir } from '@tauri-apps/api/fs';

export async function isFolderEmpty(folder: string) {
	let files = await readDir(folder);
	return files.length === 0;
}
