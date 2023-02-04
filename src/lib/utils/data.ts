import { servers, states } from '$lib/stores/servers';
import type { Server, Servers } from '$lib/types/server';
import { removeDir } from '@tauri-apps/api/fs';
import { get } from 'svelte/store';
import { Store } from 'tauri-plugin-store-api';
import { stopServer } from './manageServer';

export async function loadData() {
	const store = new Store('servers.json');
	let data = await store.get<Servers>('servers');
	if (data) {
		servers.set(data);
	} else {
		// saves empty object
		saveData();
	}

	for (const key of Object.keys(get(servers))) {
		states.update((data) => {
			// prevent all servers getting a reference to the same state object
			data[key] = {
				running: false,
				child: undefined,
				output: [],
			};
			return data;
		});
	}
}

async function saveData() {
	const store = new Store('servers.json');
	await store.set('servers', get(servers));
	store.save();
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
	states.update((data) => {
		data[id] = {
			running: false,
			child: undefined,
			output: [],
		};
		return data;
	});

	await saveData();
	return id;
}

export async function deleteServer(server: Server) {
	await stopServer(server.id);
	await removeDir(server.path, { recursive: true });

	servers.update((data) => {
		delete data[server.id];
		return data;
	});
	states.update((data) => {
		delete data[server.id];
		return data;
	});

	await saveData();
}
