<script lang="ts">
	import type { Child } from '@tauri-apps/api/shell';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';

	export let output: string[] = [];
	export let child: Child | undefined;
	let consoleDiv: HTMLDivElement;
	let autoscroll: boolean;
	let input: string;
	let inputElement: HTMLInputElement;

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

	function enterCommand() {
		if (child && input) {
			child.write(`${input}\n`);
			input = '';
			inputElement.focus();
		}
	}
</script>

<div
	bind:this={consoleDiv}
	class="scrollbar mt-4 h-[65vh] overflow-y-auto break-words border border-b-0
	border-neutral-500 bg-neutral-900 px-4 py-2 font-mono"
>
	{#each output as line}
		<p>{line}</p>
	{/each}
</div>
<form class="flex w-full" on:submit|preventDefault={enterCommand}>
	<input
		type="text"
		class="flex-grow border-neutral-500 bg-neutral-900 px-2 focus:border"
		placeholder="Enter command"
		bind:value={input}
		bind:this={inputElement}
	/>
	<input type="submit" value="Enter" class="bg-neutral-600 px-2 hover:bg-neutral-700" />
</form>

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
