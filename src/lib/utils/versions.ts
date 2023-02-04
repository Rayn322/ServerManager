import type { PaperVersionsList } from '$lib/types/paper';
import { getClient } from '@tauri-apps/api/http';

export async function getVersionList(): Promise<string[]> {
	const client = await getClient();
	const paperVersionsList = await (
		await client.get<PaperVersionsList>('https://papermc.io/api/v2/projects/paper')
	).data;

	return paperVersionsList.versions.reverse();
}
