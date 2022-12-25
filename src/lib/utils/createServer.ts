import { goto } from '$app/navigation';
import type { PaperBuildsList, PaperVersionsList } from '$lib/types/paper';
import { getClient } from '@tauri-apps/api/http';
import download from 'tauri-plugin-download-api';
import { saveServer } from './data';

export async function openServerPage(id: string) {
	goto(`/server?id=${id}`);
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
