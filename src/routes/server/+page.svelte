<script lang="ts">
	import { page } from '$app/stores';
	const id = $page.url.searchParams.get('id');
</script>

<p>This is server</p>
<p>ID: {id}</p>
