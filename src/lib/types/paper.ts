export interface PaperVersionsList {
	project: { id: string; name: string };
	versions: {
		[version: string]: string[];
	}
};

export interface PaperBuildsList  {
	version: { id: string };
	builds: number[];
};

export interface PaperBuildDetails {
	id: number;
	downloads: {
		"server:default" : {
			name: string;
			url: string;
		}
	}
}