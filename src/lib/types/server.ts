import type { Child } from '@tauri-apps/api/shell';

export type Server = {
	id: string;
	name: string;
	path: string;
	version: string;
	paperBuild: number;
};

export type Servers = {
	[key: string]: Server;
};

export type State = {
	running: boolean;
	child?: Child;
	output: string[];
};

export type ServerStates = {
	[key: string]: State;
};
