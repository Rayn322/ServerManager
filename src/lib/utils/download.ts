import type { PaperBuildsList, PaperVersionsList } from '$lib/types/paper';
import { getClient } from '@tauri-apps/api/http';
import download from 'tauri-plugin-download-api';

export async function downloadJar(version: string, path: string) {
	let downloaded = 0;
	await download(await getDownloadUrl(version), `${path}/server.jar`, (progress, total) => {
		downloaded += progress;
		console.log(downloaded / total);
	});
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

	return `https://papermc.io/api/v2/projects/paper/versions/${paperVersion}/builds/${latestBuild}/downloads/paper-${paperVersion}-${latestBuild}.jar`;
}
