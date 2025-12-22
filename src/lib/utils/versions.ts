import type { PaperVersionsList } from '$lib/types/paper';
import { getClient } from '@tauri-apps/api/http';

export async function getVersionList() {
	const client = await getClient();
	const paperVersionsList = await (
		await client.get<PaperVersionsList>('https://fill.papermc.io/v3/projects/paper')
	).data;

	const versions: string[] = [];
	for (const versionGroup in paperVersionsList.versions) {
		versions.push(...paperVersionsList.versions[versionGroup]);
	}

	return versions;
}
