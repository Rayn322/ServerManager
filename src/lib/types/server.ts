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
};

export type ServerStates = {
	[key: string]: State;
};
