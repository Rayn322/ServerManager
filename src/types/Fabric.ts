export interface FabricOptions {
  loaderVersion: string;
  installerVersion: string;
}

export interface FabricVersionsList {
  game: Game[];
  mappings: Loader[];
  intermediary: Installer[];
  loader: Loader[];
  installer: Installer[];
}

export interface Game {
  version: string;
  stable: boolean;
}

export interface Installer {
  url?: string;
  maven: string;
  version: string;
  stable: boolean;
}

export interface Loader {
  separator: Separator;
  build: number;
  maven: string;
  version: string;
  stable: boolean;
  gameVersion?: string;
}

export enum Separator {
  Build = '+build.',
  Empty = '.'
}
