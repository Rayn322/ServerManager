<script lang="ts">
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';

	export let output: string[] = [];
	let consoleDiv: HTMLDivElement;
	let autoscroll: boolean;

	beforeUpdate(() => {
		autoscroll =
			consoleDiv && consoleDiv.offsetHeight + consoleDiv.scrollTop > consoleDiv.scrollHeight - 20;
	});

	afterUpdate(() => {
		if (autoscroll) consoleDiv?.scrollTo(0, consoleDiv.scrollHeight);
	});

	onMount(() => {
		consoleDiv?.scrollTo(0, consoleDiv.scrollHeight);
	});
</script>

<div
	bind:this={consoleDiv}
	class="scrollbar mt-4 h-[65vh] overflow-y-auto break-words border border-neutral-500 
	bg-neutral-900 px-4 py-2 font-mono"
>
	{#each output as line}
		<p>{line}</p>
	{/each}
</div>

<style lang="postcss">
	.scrollbar::-webkit-scrollbar {
		width: 10px;
		height: 8px;
		@apply bg-neutral-700;
	}

	.scrollbar::-webkit-scrollbar-thumb {
		@apply bg-neutral-500 hover:bg-neutral-400;
	}
</style>
