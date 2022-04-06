<script lang="ts">
  import { downloadJar, getVersionList } from '../utils/Downloader';
  import { ServerType } from '../types/ServerType';

  export let closeDialogue: () => void;

  let name = '';
  let serverType = ServerType.FORGE;
  let serverVersion = '';
  let versionList = getVersions(serverType);

  async function getVersions(serverType: ServerType): Promise<string[]> {
    const versionList = await getVersionList(serverType);
    serverVersion = versionList[0];
    return versionList;
  }

  function createServer() {
    if (name.length === 0) {
      return;
    }

    closeDialogue();
    console.log(`Creating server ${name} of type ${serverType} and version ${serverVersion}`);
    downloadJar(
      serverType,
      serverVersion,
      `C:/Users/Ryan/Desktop/ServerManager/instances/${name}/server.jar`
    );
  }
</script>

<div class="dialogue">
  <p>Create Server</p>
  <form on:submit|preventDefault={createServer}>
    <div class="input">
      <label for="name">Name</label>
      <input type="text" name="name" placeholder="My Minecraft Server" bind:value={name} />
    </div>

    <div class="input">
      <label for="type">Type</label>
      <select name="type" bind:value={serverType}>
        <option value={ServerType.VANILLA}>Vanilla</option>
        <option value={ServerType.SNAPSHOT}>Snapshot</option>
        <option value={ServerType.PAPER}>Paper</option>
        <option value={ServerType.FABRIC}>Fabric</option>
        <option value={ServerType.FORGE}>Forge</option>
      </select>
    </div>

    <div class="input">
      <label for="version">Version</label>
      <select name="version" bind:value={serverVersion}>
        {#await versionList then list}
          {#each list as version}
            <option value={version}>{version}</option>
          {/each}
        {/await}
      </select>
    </div>

    <button>Create</button>
  </form>
</div>
<div class="background" on:click={closeDialogue} />

<style>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  .dialogue {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: clamp(200px, 80vw, 800px);
    height: 50vh;
    padding: 0.5em 3.5em;
    font-size: 2rem;
    color: #c5c5c5;
    background-color: #000000;
    border: 3px solid #c5c5c5;
    border-radius: 1em;
    z-index: 2;
  }

  input,
  select {
    /* font-size: 0.7rem; */
    width: clamp(100px, 40vw, 400px);
    padding: 1em 0.5em;
    color: #c5c5c5;
    background-color: #000000;
    border: none;
    border-bottom: 3px solid #c5c5c5;
    outline: none;
    transition: border-bottom 0.2s ease-in-out;
  }

  input:focus,
  select:focus {
    border-bottom: 3px solid #213766;
  }

  /* input::-webkit-input-placeholder {
    transition: font-size 0.2s ease-in-out;
  }

  input:focus::-webkit-input-placeholder {
    font-size: 1.1em;
  } */

  .input {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
