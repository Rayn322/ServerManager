<script lang="ts">
	export let open;

	const onKeyDown = (e: KeyboardEvent) => {
		console.log(e.key);
		if (e.key === 'Escape') {
			open = false;
		}
	};
</script>

<svelte:window on:keydown={(e) => onKeyDown(e)} />

<!-- ignoring since we have the event on the window but this probably isn't the best -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click|self={() => (open = false)}
	class="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
>
	<div class="flex h-2/3 w-1/2 flex-col items-center gap-4 rounded bg-neutral-600 p-6">
		<h2 class="text-2xl">New Server</h2>
		<form>
			<div class="flex flex-col items-center justify-center gap-2">
				<div>
					<label for="type">Server type</label>
					<select
						class="mb-2 rounded border border-neutral-200 bg-neutral-800 py-1"
						id="type"
						title="Paper is the only supported option"
						disabled
					>
						<option value="1">Paper</option>
					</select>
				</div>
				<div>
					<label for="version">Server version</label>
					<select class="rounded border border-neutral-200 bg-neutral-800 py-1" id="version">
						<option value="1">1.19.3</option>
					</select>
				</div>
			</div>
		</form>
	</div>
</div>
