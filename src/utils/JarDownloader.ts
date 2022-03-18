import { getClient } from '@tauri-apps/api/http';
import { ServerType } from '../types/ServerType';
import type { MojangVersionManifest, MojangVersionInfo } from '../types/Mojang';
import type { PaperVersionsList, PaperBuildsList } from '../types/Paper';

export async function downloadJar(serverType: ServerType, version: string, outputDir: string) {
  const url = await getDownloadURL(serverType, version);
  console.log(url);
}

async function getDownloadURL(serverType: ServerType, serverVersion: string) {
  const client = await getClient();
  let serverJarURL: string;

  switch (serverType) {
    // https://gaming.stackexchange.com/questions/123194/is-there-a-way-to-get-the-latest-server-jar-through-a-url-that-doesnt-change
    case ServerType.VANILLA || ServerType.SNAPSHOT:
      
      // gets list of versions from Mojang
      const mojangVersionManifest = await (
        await client.get<MojangVersionManifest>(
          'https://launchermeta.mojang.com/mc/game/version_manifest.json'
        )
      ).data;

      const mojangVersionURL = mojangVersionManifest.versions.find(
        (version) => version.id === serverVersion
      ).url;

      if (!mojangVersionURL) {
        return null;
      }

      // gets the list with version specific downloads
      const mojangVersionInfo = await (
        await client.get<MojangVersionInfo>(mojangVersionURL)
      ).data;

      return mojangVersionInfo.downloads.server.url;

    case ServerType.PAPER:
      // gets list of versions from Paper
      const paperVersionsList = await (
        await client.get<PaperVersionsList>('https://papermc.io/api/v2/projects/paper')
      ).data;

      const paperVersion = paperVersionsList.versions.find((version) => version === serverVersion);

      if (!paperVersion) {
        return null;
      }

      // gets list of builds for the specified version
      const paperBuildsList = await (
        await client.get<PaperBuildsList>(
          `https://papermc.io/api/v2/projects/paper/versions/${paperVersion}`
        )
      ).data;

      // gets the last item in order to get the most recent build
      const paperBuild = paperBuildsList.builds[paperBuildsList.builds.length - 1];

      return `https://papermc.io/api/v2/projects/paper/versions/${paperVersion}/builds/${paperBuild}/downloads/paper-${paperVersion}-${paperBuild}.jar`;

    case ServerType.FABRIC:
    case ServerType.FORGE:
    default:
  }
}
