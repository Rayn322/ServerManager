import type { Server } from '$lib/types/server';
import { Store } from 'tauri-plugin-store-api';

let servers: Server[] = [
	{
		name: 'test server',
		path: 'D:\\MinecraftServers\\Empty',
		paperBuild: 1,
		version: '1.19.3',
	},
];

export async function loadData() {
	const store = new Store('servers.json');
	let data = await store.get<Server[]>('servers');
	if (data) {
		servers = data;
	} else {
		await store.set('servers', servers);
	}
}

export function getData() {
	return servers;
}

async function saveData() {
	const store = new Store('servers.json');
	await store.set('servers', servers);
}
