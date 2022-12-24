export type Server = {
	id: string;
	name: string;
	path: string;
	version: string;
	paperBuild: number;
};

export type ServersObject = {
	[key: string]: Server;
};
