<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Server } from '$lib/types/server';
	import { getServer } from '$lib/utils/manageServer';

	const id = $page.url.searchParams.get('id');
	let tab: 'console' | 'settings' = 'console';
	let server: Server | undefined;
	if (id) {
		server = getServer(id);
	}
</script>

<div class="fixed top-0 left-0 mt-14 flex h-screen w-64 flex-col bg-neutral-900 py-4">
	<button class="p-2 hover:bg-neutral-700" on:click={() => (tab = 'console')}>Console</button>
	<button class="p-2 hover:bg-neutral-700" on:click={() => (tab = 'settings')}>Settings</button>
</div>
<div class="ml-64 p-4">
	{#if tab === 'console'}
		<h1>Console</h1>
	{:else if tab === 'settings'}
		<h1>Settings</h1>
	{:else}
		<h1>Server</h1>
	{/if}
</div>

<div class="fixed bottom-8 left-8">
	<button
		on:click={() => goto('/')}
		class="flex items-center justify-center rounded-xl bg-blue-800 p-4 text-xl hover:bg-blue-700"
	>
		Back
	</button>
</div>
