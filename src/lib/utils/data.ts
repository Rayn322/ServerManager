import { servers, states } from '$lib/stores/servers';
import type { Servers, State } from '$lib/types/server';
import { get } from 'svelte/store';
import { Store } from 'tauri-plugin-store-api';

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

async function saveData() {
	const store = new Store('servers.json');
	await store.set('servers', get(servers));
	store.save();
}
