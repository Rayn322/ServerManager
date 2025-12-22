import { goto } from '$app/navigation';
import { servers, states } from '$lib/stores/servers';
import type { PaperBuildDetails } from '$lib/types/paper';
import { saveServer } from '$lib/utils/data';
import { getClient } from '@tauri-apps/api/http';
import { Command } from '@tauri-apps/api/shell';
import { get } from 'svelte/store';
import { download } from 'tauri-plugin-upload-api';
import { acceptEula, eulaIsAccepted } from './fs';

export async function openServerPage(id: string) {
	goto(`/server?id=${id}`);
}

export async function startServer(id: string) {
	console.log('starting server', id);
	const server = get(servers)[id];

	// TODO: add message about accepting eula
	if (!(await eulaIsAccepted(server))) {
		await acceptEula(server);
	}

	const command = new Command(
		'java',
		['-jar', `paper-${server.version}-${server.paperBuild}.jar`, 'nogui'],
		{ cwd: server.path },
	);

	command.on('close', (data) => {
		console.log(`command finished with code ${data.code} and signal ${data.signal}`);
		states.update((states) => {
			states[id].running = false;
			states[id].child = undefined;
			return states;
		});
	});
	command.on('error', (error) => console.error(`command error: "${error}"`));
	command.stdout.on('data', (line) => {
		states.update((states) => {
			states[id].output.push(line);
			return states;
		});
	});
	command.stderr.on('data', (line) => console.log(`command stderr: "${line}"`));

	const child = await command.spawn();
	console.log('spawned');

	states.update((states) => {
		states[id].running = true;
		states[id].child = child;

		return states;
	});
}

export async function stopServer(id: string) {
	const state = get(states)[id];
	if (state.running) {
		state.child?.write('stop\n');
	}
}

export async function createServer(name: string, path: string, version: string) {
	const paperBuild = await downloadJar(version, path, (progress, total) => {
		console.log(progress / total);
	});
	const id = await saveServer(name, path, version, paperBuild);
	openServerPage(id);
}

export async function downloadJar(
	version: string,
	path: string,
	progressCallback: (progress: number, total: number) => void,
) {
	let downloaded = 0;
	const { url, paperBuild } = await getDownloadUrl(version);
	await download(url, `${path}/paper-${version}-${paperBuild}.jar`, (progress, total) => {
		downloaded += progress;
		progressCallback(downloaded, total);
	});
	return paperBuild;
}

async function getDownloadUrl(version: string) {
	const client = await getClient();

	const buildDetails =( await client.get<PaperBuildDetails>(
		`https://fill.papermc.io/v3/projects/paper/versions/${version}/builds/latest`
	)).data;

	return {
		url: buildDetails.downloads['server:default'].url,
		paperBuild: buildDetails.id,
	};
}
