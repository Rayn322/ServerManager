<script lang="ts">
	import { type } from '@tauri-apps/api/os';

	// temp fix until I can use transparent title bar and set background color
	// TODO: see how this looks on linux
	async function isMacOS() {
		return (await type()) === 'Darwin';
	}
</script>

<div data-tauri-drag-region class="border-b border-neutral-700 p-3">
	{#await isMacOS()}
		<h1 data-tauri-drag-region class="text-2xl">MC Server Manager</h1>
	{:then macOS}
		<h1 data-tauri-drag-region class:mt-3={macOS} class="text-2xl">MC Server Manager</h1>
	{/await}
</div>
