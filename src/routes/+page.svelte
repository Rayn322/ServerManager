<script lang="ts">
  import { Plus } from "@lucide/svelte";
  import ServerCard from "../components/ServerCard.svelte";
  import { open } from "@tauri-apps/plugin-dialog";

  let modalOpen = $state(true);
  let path = $state("");
</script>

<!-- who cares about the layout for now -->
<main class="grid grid-cols-5 gap-4 p-8">
  <ServerCard name="Cool Server with a long name" />
  <ServerCard name="Cool Server" />
  <ServerCard name="Cool Server" />
  <ServerCard name="Cool Server" />
  <ServerCard name="Cool Server" />
  <ServerCard name="Cool Server" />
  <ServerCard name="Cool Server" />
  <ServerCard name="Cool Server" />
  <button
    onclick={() => (modalOpen = true)}
    class="absolute right-8 bottom-8 flex cursor-pointer rounded-lg bg-green-700 p-4"
  >
    <Plus />
  </button>

  {#if modalOpen}
    <div
      class="fixed inset-0 flex items-center justify-center bg-black/75"
      role="presentation"
      onmousedown={(e) => {
        if (e.currentTarget === e.target) modalOpen = false;
      }}
    >
      <div class="flex max-w-dvw flex-col gap-6 rounded-lg bg-neutral-900 p-8">
        <h2 class="text-2xl">Create New Server</h2>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="rounded bg-neutral-800 p-2 outline-none"
              placeholder="My Cool Server"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="version">Version</label>
            <select
              id="version"
              class="rounded bg-neutral-800 p-2 outline-none"
            >
              <option>Placeholder</option>
            </select>
          </div>
          <div class="flex flex-col gap-2">
            <label for="path">Path</label>
            <div class="flex flex-wrap gap-2">
              <input
                id="path"
                type="text"
                class="grow rounded bg-neutral-800 p-2 outline-none"
                placeholder="/path/to/server"
                bind:value={path}
              />
              <button
                class="rounded bg-neutral-500 px-4 py-2 text-white"
                onclick={async () => {
                  const selectedPath = await open({
                    directory: true,
                    recursive: true,
                  });
                  if (selectedPath) {
                    path = selectedPath;
                  }
                }}
              >
                Open
              </button>
            </div>
          </div>
        </div>

        <div class="flex gap-2">
          <button
            class="cursor-pointer rounded bg-neutral-500 px-4 py-2 text-white"
            onclick={() => (modalOpen = false)}
          >
            Close
          </button>
          <button
            class="grow cursor-pointer rounded bg-green-700 px-4 py-2 text-white"
          >
            Create Server
          </button>
        </div>
      </div>
    </div>
  {/if}
</main>
