<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	const id = $page.url.searchParams.get('id');
</script>

<p>This is server</p>
<p>ID: {id}</p>

<!-- <button on:click={() => goto('/')} class="rounded bg-blue-600 p-4">back</button> -->
<div class="fixed bottom-8 left-8">
	<button
		on:click={() => goto('/')}
		class="flex items-center justify-center rounded-xl bg-blue-800 p-4 text-xl hover:bg-blue-700"
	>
		Back
	</button>
</div>
