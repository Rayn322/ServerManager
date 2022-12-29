import type { Server } from '$lib/types/server';
import { exists, readDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { parse, stringify } from 'ini';

export async function isFolderEmpty(folder: string) {
	let files = await readDir(folder);
	return files.length === 0;
}

export async function readPropertiesFile(path: string) {
	let file = await readTextFile(path);
	return parse(file);
}

export async function acceptEula(server: Server) {
	await writeTextFile(`${server.path}\\eula.txt`, stringify({ eula: true }));
}

export async function eulaIsAccepted(server: Server) {
	const eulaPath = `${server.path}\\eula.txt`;
	if (await exists(eulaPath)) {
		let file = await readPropertiesFile(eulaPath);
		return file.eula;
	} else {
		return false;
	}
}
