<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	const id = $page.url.searchParams.get('id');
</script>

<button on:click={() => goto('/')} class="rounded bg-blue-600 p-4">back</button>
<p>This is server</p>
<p>ID: {id}</p>
