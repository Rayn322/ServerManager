export interface PaperVersionsList {
  project_id: string;
  project_name: string;
  version_groups: string[];
  versions: string[];
}

export interface PaperBuildsList {
  project_id: string;
  project_name: string;
  version: string;
  builds: number[];
}
