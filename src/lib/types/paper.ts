export type PaperVersionsList = {
	project_id: string;
	project_name: string;
	version_groups: string[];
	versions: string[];
};

export type PaperBuildsList = {
	project_id: string;
	project_name: string;
	version: string;
	builds: number[];
};
