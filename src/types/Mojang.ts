export interface MojangVersionManifest {
  latest:   Latest;
  versions: Version[];
}

export interface Latest {
  release:  string;
  snapshot: string;
}

export interface Version {
  id:          string;
  type:        Type;
  url:         string;
  time:        Date;
  releaseTime: Date;
}

export enum Type {
  OldAlpha = "old_alpha",
  OldBeta = "old_beta",
  Release = "release",
  Snapshot = "snapshot",
}

export interface MojangVersionsList {
  arguments:              Arguments;
  assetIndex:             Arguments;
  assets:                 string;
  complianceLevel:        number;
  downloads:              MojangVersionsListDownloads;
  id:                     string;
  javaVersion:            JavaVersion;
  libraries:              Library[];
  logging:                Logging;
  mainClass:              string;
  minimumLauncherVersion: number;
  releaseTime:            Date;
  time:                   Date;
  type:                   string;
}

export interface Arguments {
}

export interface MojangVersionsListDownloads {
  client:          ClientMappingsClass;
  client_mappings: ClientMappingsClass;
  server:          ClientMappingsClass;
  server_mappings: ClientMappingsClass;
}

export interface ClientMappingsClass {
  sha1:  string;
  size:  number;
  url:   string;
  path?: string;
  id?:   string;
}

export interface JavaVersion {
  component:    string;
  majorVersion: number;
}

export interface Library {
  downloads: LibraryDownloads;
  name:      string;
  rules?:    Rule[];
  natives?:  Natives;
  extract?:  Extract;
}

export interface LibraryDownloads {
  artifact:     ClientMappingsClass;
  classifiers?: Classifiers;
}

export interface Classifiers {
  javadoc?:           ClientMappingsClass;
  "natives-linux"?:   ClientMappingsClass;
  "natives-macos"?:   ClientMappingsClass;
  "natives-windows"?: ClientMappingsClass;
  sources?:           ClientMappingsClass;
  "natives-osx"?:     ClientMappingsClass;
}

export interface Extract {
  exclude: string[];
}

export interface Natives {
  osx?:     string;
  linux?:   string;
  windows?: string;
}

export interface Rule {
  action: Action;
  os?:    Os;
}

export enum Action {
  Allow = "allow",
  Disallow = "disallow",
}

export interface Os {
  name: Name;
}

export enum Name {
  Osx = "osx",
}

export interface Logging {
  client: LoggingClient;
}

export interface LoggingClient {
  argument: string;
  file:     ClientMappingsClass;
  type:     string;
}
