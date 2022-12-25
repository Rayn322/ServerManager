<script lang="ts">
	import type { Server } from '$lib/types/server';
	import { openServerPage } from '$lib/utils/createServer';

	export let server: Server;
</script>

<button
	on:click={() => openServerPage(server.id)}
	class="flex h-24 w-48 items-center justify-center rounded-md bg-blue-900 hover:bg-blue-800"
>
	<h1 class="text-xl">{server.name}</h1>
</button>
