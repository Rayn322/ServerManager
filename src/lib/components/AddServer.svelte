<script lang="ts">
	import { getVersionList } from '$lib/utils/versions';
	import { open as openFolder } from '@tauri-apps/api/dialog';

	export let open;
	let versions = getVersions();
	let version: string;
	let folder: string;

	async function getVersions() {
		const versionList = await getVersionList();
		// get around svelte bug that I should go report
		version = versionList[0];
		return versionList;
	}

	const getFolder = async () => {
		const path = (await openFolder({
			directory: true,
			recursive: true,
		})) as string | null;

		if (path) {
			folder = path;
		}
	};

	const onSubmit = () => {
		console.log(version, folder);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			open = false;
		}
	};
</script>

<svelte:window on:keydown={(e) => onKeyDown(e)} />

<div
	on:mousedown|self={() => (open = false)}
	class="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
>
	<div class="flex w-1/2 flex-col items-center gap-4 rounded bg-neutral-600 p-6">
		<h2 class="text-2xl">New Server</h2>
		<form on:submit|preventDefault={onSubmit}>
			<div class="flex flex-col items-center justify-center gap-4">
				<div>
					<label for="type">Type</label>
					<select
						class="rounded border-2 border-neutral-200 bg-neutral-800 py-1"
						id="type"
						title="Paper is the only supported option"
						disabled
					>
						<option value="1">Paper</option>
					</select>
				</div>
				<div>
					<label for="version">Version</label>
					<select
						class="rounded border-2 border-neutral-200 bg-neutral-800 py-1"
						id="version"
						bind:value={version}
					>
						{#await versions}
							<option>Loading...</option>
						{:then versions}
							{#each versions as version}
								<option value={version}>{version}</option>
							{/each}
						{/await}
					</select>
				</div>
				<div>
					<label for="folder" class="inline">Folder</label>
					<input
						disabled
						type="text"
						class="bg-neutral-800 text-sm text-neutral-500"
						value={folder ?? 'No folder selected'}
					/>
					<input
						on:click={getFolder}
						id="folder"
						type="button"
						value="Select"
						class="rounded border-2 border-neutral-200 bg-neutral-800 p-1 px-2 focus:border-blue-600"
					/>
				</div>
				<div class="space-x-2">
					<button
						on:click={() => (open = false)}
						class="rounded bg-neutral-700 p-2 ring-2 ring-neutral-500 hover:bg-neutral-600 hover:ring-neutral-400"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="rounded bg-blue-700 p-2 ring-2 ring-blue-600 hover:bg-blue-600 hover:ring-blue-500"
					>
						Create
					</button>
				</div>
			</div>
		</form>
	</div>
</div>
