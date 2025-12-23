<script lang="ts">
  import { Plus } from "@lucide/svelte";
  import ServerCard from "../components/ServerCard.svelte";

  let modalOpen = $state(true);
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
      <div class="flex flex-col gap-8 rounded-lg bg-neutral-900 p-8">
        <h2 class="text-2xl">Create New Server</h2>
        <button
          class="rounded bg-blue-500 px-4 py-2 text-white"
          onclick={() => (modalOpen = false)}
        >
          Close
        </button>
      </div>
    </div>
  {/if}
</main>
