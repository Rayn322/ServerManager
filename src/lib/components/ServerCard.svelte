<script lang="ts">
	import type { Server } from '$lib/types/server';

	export let server: Server = {
		id: 'asldkfjawge',
		name: 'Sample Server',
		path: 'D:\\MinecraftServers\\Empty',
		paperBuild: 400,
		version: '1.19.3',
	};
</script>

<div class="flex h-24 w-48 items-center justify-center rounded-md bg-blue-900">
	<h1 class="text-xl">{server.name}</h1>
</div>
