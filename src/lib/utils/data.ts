import { servers, states } from '$lib/stores/servers';
import type { Servers, State } from '$lib/types/server';
import { get } from 'svelte/store';
import { Store } from 'tauri-plugin-store-api';

const initialState: State = {
	running: false,
	child: undefined,
};

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
			data[key] = initialState;
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
		data[id] = initialState;
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
