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
	return id;
}

async function saveData() {
	const store = new Store('servers.json');
	await store.set('servers', get(servers));
	store.save();
}
