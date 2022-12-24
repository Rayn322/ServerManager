import type { ServersObject } from '$lib/types/server';
import { writable } from 'svelte/store';

export const servers = writable<ServersObject>({});
