import { getClient } from '@tauri-apps/api/http';
import type { MojangVersionManifest, MojangVersionInfo } from 'src/types/Mojang';
import type { PaperVersionsList, PaperBuildsList } from 'src/types/Paper';
import type { FabricOptions, FabricVersionsList } from 'src/types/Fabric';
import type { ForgeVersionsList } from 'src/types/Forge';
import { ServerType } from '../types/ServerType';

export async function downloadJar(
  serverType: ServerType,
  version: string,
  outputDir: string,
  options?: FabricOptions
) {
  const url = await getDownloadURL(serverType, version, options);
  console.log(url);
}

async function getDownloadURL(
  serverType: ServerType,
  serverVersion: string,
  options?: FabricOptions
) {
  const client = await getClient();

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
      const mojangVersionInfo = await (await client.get<MojangVersionInfo>(mojangVersionURL)).data;

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
      if (options) {
        return `https://meta.fabricmc.net/v2/versions/loader/${serverVersion}/${options.loaderVersion}/${options.installerVersion}/server/jar`;
      } else {
        const fabricVersionsList = await (
          await client.get<FabricVersionsList>('https://meta.fabricmc.net/v2/versions')
        ).data;

        // get latest loader and installer version
        const loaderVersion = fabricVersionsList.loader[0].version;
        const installerVersion = fabricVersionsList.installer[0].version;

        return `https://meta.fabricmc.net/v2/versions/loader/${serverVersion}/${loaderVersion}/${installerVersion}/server/jar`;
      }
    case ServerType.FORGE:
      // https://github.com/hexparrot/mineos-node/blob/master/profiles.d/forge.js
      // https://discourse.codeemo.com/t/list-of-forge-server-jars/744
      const forgeVersionsList = await (
        await client.get<ForgeVersionsList>(
          'https://files.minecraftforge.net/net/minecraftforge/forge/promotions_slim.json'
        )
      ).data;

      const forgeVersion = forgeVersionsList.promos[serverVersion];
      const minecraftVersion = serverVersion.substring(0, serverVersion.indexOf('-'));
      console.log(minecraftVersion);

      return `https://files.minecraftforge.net/maven/net/minecraftforge/forge/${minecraftVersion}-${forgeVersion}/forge-${minecraftVersion}-${forgeVersion}-installer.jar`;
    default:
  }
}
