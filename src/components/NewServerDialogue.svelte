<script lang="ts">
  import { downloadJar, getVersionList } from '../utils/Downloader';
  import { ServerType } from '../types/ServerType';

  export let closeDialogue: () => void;

  let type = ServerType.VANILLA;
  let version = '';
  let versionList: string[] = [];
  let name = '';

  function createServer() {
    closeDialogue();
    console.log(`Creating server ${name} of type ${type} and version ${version}`);
    downloadJar(type, version, `C:/Users/Ryan/Desktop/ServerManager/instances/${name}/server.jar`);
  }
</script>

<div class="dialogue">
  <h2 class="title">Select Type</h2>
  <div class="container">
    <div class="option">
      <h4>Type</h4>
      <div class="list">
        <button>Vanilla</button>
        <button>Snapshot</button>
        <button>Paper</button>
        <button>Fabric</button>
        <button>Forge</button>
      </div>
    </div>

    <div class="option">
      <h4>Version</h4>
      <div class="list">
        <button>1.18.2</button>
        <button>1.18</button>
        <button>1.18</button>
        <button>1.18</button>
        <button>1.18</button>
        <button>1.18</button>
        <button>1.18</button>
        <button>1.18</button>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="option">
      <h4>Name</h4>
      <input type="text" />
    </div>
  </div>
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
    width: clamp(200px, 80vw, 1200px);
    height: 80vh;
    padding: 0.5em 3.5em;
    font-size: 2rem;
    color: #c5c5c5;
    background-color: #000000;
    border: 3px solid #c5c5c5;
    border-radius: 1em;
    z-index: 2;
    overflow-y: hidden;
  }

  .title {
    font-size: 2rem;
  }

  .container {
    display: flex;
    justify-content: space-around;
    height: fit-content;
  }

  .option {
    width: 40%;
    height: fit-content;
  }

  .list {
    display: flex;
    flex-direction: column;
    height: 10em;
    border-radius: 0.25em;
    border: #c5c5c5 1px solid;
    background-color: var(--background-color);
    overflow-y: overlay;
  }

  ::-webkit-scrollbar {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #c5c5c53f;
  }

  button {
    font-size: 1.5rem;
    color: var(--font-color);
    background-color: transparent;
    border: none;
    padding: 0.4em;
  }

  button:hover {
    background-color: #0d1629;
  }
</style>
