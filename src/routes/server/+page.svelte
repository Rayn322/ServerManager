<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Console from '$lib/components/Console.svelte';
	import { servers, states } from '$lib/stores/servers';
	import { deleteServer } from '$lib/utils/data';
	import { startServer, stopServer } from '$lib/utils/manageServer';

	type Tab = 'console' | 'settings' | 'details';

	const id = $page.url.searchParams.get('id') as string;
	let tab: Tab = 'console';
	$: server = id ? $servers[id] : null;
	$: state = id ? $states[id] : null;

	async function deleteThis() {
		if (server) {
			await deleteServer(server);
			goto('/');
		}
	}
</script>

<div class="flex grow">
	<div class="flex w-64 flex-col bg-neutral-900 pt-4 shrink-0">
		<!-- TODO: make selected button a different color -->
		<button class="p-2 hover:bg-neutral-700" on:click={() => (tab = 'console')}>Console</button>
		<button class="p-2 hover:bg-neutral-700" on:click={() => (tab = 'settings')}>Settings</button>
		<button class="p-2 hover:bg-neutral-700" on:click={() => (tab = 'details')}>Details</button>
	</div>
	<div class="p-4 flex flex-col grow">
		<h1 class="mb-2 text-2xl capitalize">{tab}</h1>
		{#if tab === 'console'}
			{#if state?.running}
				<button class="w-fit rounded-md bg-rose-600 p-2" on:click={() => stopServer(id)}>
					Stop
				</button>
			{:else}
				<button class="w-fit rounded-md bg-emerald-600 p-2" on:click={() => startServer(id)}>
					Start
				</button>
			{/if}
			<Console output={state?.output} child={state?.child} />
		{:else if tab === 'settings'}
			<p>Settings</p>
			<button class="rounded-md bg-rose-600 p-2" on:click={deleteThis}>Delete Server</button>
		{:else if tab === 'details'}
			<p>ID: {id}</p>
			<p>Name: {server?.name}</p>
			<p>Version: {server?.version}</p>
			<p>Paper Build: {server?.paperBuild}</p>
			<p>File path: {server?.path}</p>
		{:else}
			<h1>Server</h1>
		{/if}
	</div>
</div>

<div class="fixed bottom-8 left-8">
	<button
		on:click={() => goto('/')}
		class="flex items-center justify-center rounded-xl bg-blue-800 p-4 hover:bg-blue-700"
	>
		Back
	</button>
</div>
