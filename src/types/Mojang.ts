export interface MojangVersionManifest {
  latest: Latest;
  versions: Version[];
}

export interface Latest {
  release: string;
  snapshot: string;
}

export interface Version {
  id: string;
  type: Type;
  url: string;
  time: Date;
  releaseTime: Date;
}

export enum Type {
  OldAlpha = 'old_alpha',
  OldBeta = 'old_beta',
  Release = 'release',
  Snapshot = 'snapshot'
}

export interface MojangVersionInfo {
  arguments: Arguments;
  assetIndex: AssetIndex;
  assets: string;
  complianceLevel: number;
  downloads: MojangVersionInfoDownloads;
  id: string;
  javaVersion: JavaVersion;
  libraries: Library[];
  logging: Logging;
  mainClass: string;
  minimumLauncherVersion: number;
  releaseTime: Date;
  time: Date;
  type: string;
}

export interface Arguments {
  game: Array<GameClass | string>;
  jvm: Array<JvmClass | string>;
}

export interface GameClass {
  rules: GameRule[];
  value: string[] | string;
}

export interface GameRule {
  action: Action;
  features: Features;
}

export enum Action {
  Allow = 'allow',
  Disallow = 'disallow'
}

export interface Features {
  is_demo_user?: boolean;
  has_custom_resolution?: boolean;
}

export interface JvmClass {
  rules: JvmRule[];
  value: string[] | string;
}

export interface JvmRule {
  action: Action;
  os: Purpleos;
}

export interface Purpleos {
  name?: string;
  version?: string;
  arch?: string;
}

export interface AssetIndex {
  id: string;
  sha1: string;
  size: number;
  totalSize?: number;
  url: string;
}

export interface MojangVersionInfoDownloads {
  client: ClientMappingsClass;
  client_mappings: ClientMappingsClass;
  server: ClientMappingsClass;
  server_mappings: ClientMappingsClass;
}

export interface ClientMappingsClass {
  sha1: string;
  size: number;
  url: string;
  path?: string;
}

export interface JavaVersion {
  component: string;
  majorVersion: number;
}

export interface Library {
  downloads: LibraryDownloads;
  name: string;
  rules?: LibraryRule[];
  natives?: Natives;
  extract?: Extract;
}

export interface LibraryDownloads {
  artifact: ClientMappingsClass;
  classifiers?: Classifiers;
}

export interface Classifiers {
  javadoc?: ClientMappingsClass;
  'natives-linux': ClientMappingsClass;
  'natives-macos'?: ClientMappingsClass;
  'natives-windows': ClientMappingsClass;
  sources?: ClientMappingsClass;
}

export interface Extract {
  exclude: string[];
}

export interface Natives {
  osx?: string;
  linux?: string;
  windows?: string;
}

export interface LibraryRule {
  action: Action;
  os?: Fluffyos;
}

export interface Fluffyos {
  name: Name;
}

export enum Name {
  Osx = 'osx'
}

export interface Logging {
  client: LoggingClient;
}

export interface LoggingClient {
  argument: string;
  file: AssetIndex;
  type: string;
}
