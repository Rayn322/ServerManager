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
	class="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-25"
>
	<div class="flex h-2/3 w-1/2 flex-col items-center gap-4 rounded bg-neutral-600 p-6">
		<h2 class="text-2xl">New Server</h2>
		<form>
			<div>
				<label for="server-type">Server type</label>
				<select
					class="text-black"
					id="server-type"
					title="Paper is the only supported option"
					disabled
				>
					<option value="1">Paper</option>
				</select>
			</div>
		</form>
	</div>
</div>
