import type { Servers, ServerStates } from '$lib/types/server';
import { writable } from 'svelte/store';

export const servers = writable<Servers>({});
export const states = writable<ServerStates>({});
