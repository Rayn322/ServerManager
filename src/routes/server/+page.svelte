<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getServer } from '$lib/utils/manageServer';

	const id = $page.url.searchParams.get('id');
	let server;
	if (id) {
		server = getServer(id);
	}
</script>

<div class="fixed top-0 left-0 -z-10 mt-14 flex h-screen w-64 flex-col bg-neutral-900 py-4">
	<button class="p-2 hover:bg-neutral-700">Console</button>
	<button class="p-2 hover:bg-neutral-700">Settings</button>
</div>

<div class="fixed bottom-8 left-8">
	<button
		on:click={() => goto('/')}
		class="flex items-center justify-center rounded-xl bg-blue-800 p-4 text-xl hover:bg-blue-700"
	>
		Back
	</button>
</div>
