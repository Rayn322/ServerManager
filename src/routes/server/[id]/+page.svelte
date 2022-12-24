<!-- TODO: use query params because all routes need to be prerenderable with tauri -->
<script lang="ts">
	import { page } from '$app/stores';
</script>

<p>This is server</p>
<p>ID: {$page.params.id}</p>
