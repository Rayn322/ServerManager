import { goto } from '$app/navigation';
import { servers, states } from '$lib/stores/servers';
import type { PaperBuildsList, PaperVersionsList } from '$lib/types/paper';
import { saveServer } from '$lib/utils/data';
import { getClient } from '@tauri-apps/api/http';
import { Command } from '@tauri-apps/api/shell';
import { get } from 'svelte/store';
import download from 'tauri-plugin-download-api';
import { acceptEula, eulaIsAccepted } from './fs';

export async function openServerPage(id: string) {
	goto(`/server?id=${id}`);
}

export async function startServer(id: string) {
	console.log('starting server');
	const server = get(servers)[id];

	// TODO: add message about accepting eula
	if (!(await eulaIsAccepted(server))) {
		await acceptEula(server);
	}

	const command = new Command(
		'java',
		['-jar', `paper-${server.version}-${server.paperBuild}.jar`, 'nogui'],
		{ cwd: server.path }
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
	command.stdout.on('data', (line) => console.log(`command stdout: "${line}"`));
	command.stderr.on('data', (line) => console.log(`command stderr: "${line}"`));

	const child = await command.spawn();
	console.log('spawned');

	states.update((states) => {
		if (states[id]) {
			states[id].running = true;
			states[id].child = child;
		} else {
			states[id] = {
				running: true,
				child,
			};
		}

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
	progressCallback: (progress: number, total: number) => void
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

	const versionsList = await (
		await client.get<PaperVersionsList>('https://papermc.io/api/v2/projects/paper')
	).data;

	// we can assume that the version exists because the ui only shows versions that exist
	const paperVersion = versionsList.versions.find((ver) => ver === version) as string;

	// gets list of builds for the specified version
	const buildsList = await (
		await client.get<PaperBuildsList>(
			`https://papermc.io/api/v2/projects/paper/versions/${paperVersion}`
		)
	).data;

	// gets the last item in order to get the most recent build
	const latestBuild = buildsList.builds[buildsList.builds.length - 1];

	return {
		url: `https://papermc.io/api/v2/projects/paper/versions/${paperVersion}/builds/${latestBuild}/downloads/paper-${paperVersion}-${latestBuild}.jar`,
		paperBuild: latestBuild,
	};
}
