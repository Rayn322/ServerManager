<script lang="ts">
  import { Plus } from "@lucide/svelte";
  import ServerCard from "../components/ServerCard.svelte";
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
    class="absolute right-8 bottom-8 flex cursor-pointer rounded-lg bg-green-700 p-4"
  >
    <Plus />
  </button>
</main>
