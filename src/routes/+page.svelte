<script lang="ts">
	import AddServer from '$lib/components/AddServer.svelte';
	import ServerCard from '$lib/components/ServerCard.svelte';
	import { servers } from '$lib/stores/servers';
	let open = false;
</script>

<div class="m-auto flex max-w-4xl flex-wrap justify-center gap-6 p-4">
	{#each Object.values($servers) as server (server.id)}
		<ServerCard {server} />
	{/each}
</div>

{#if open}
	<AddServer bind:open />
{/if}

<div class="fixed bottom-8 right-8">
	<button
		on:click={() => (open = true)}
		class="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-800 text-4xl hover:bg-blue-700"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="h-6 w-6 stroke-white"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>
	</button>
</div>
