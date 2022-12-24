import { servers } from '$lib/stores/servers';
import type { ServersObject } from '$lib/types/server';
import { get } from 'svelte/store';
import { Store } from 'tauri-plugin-store-api';

export async function loadData() {
	const store = new Store('servers.json');
	let data = await store.get<ServersObject>('servers');
	if (data) {
		servers.set(data);
	} else {
		// saves empty object
		saveData();
	}
	saveServer('Test Server', 'C:\\Users\\User\\Desktop\\Test Server', '1.16.5', 777);
}

export async function saveServer(name: string, path: string, version: string, paperBuild: number) {
	const id = crypto.randomUUID();
	servers.update((data) => {
		data[id] = {
			id,
			name,
			path,
			version,
			paperBuild,
		};
		return data;
	});
	await saveData();
}

async function saveData() {
	const store = new Store('servers.json');
	await store.set('servers', get(servers));
	store.save();
}
