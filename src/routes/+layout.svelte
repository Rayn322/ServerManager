<script>
	import Header from '$lib/components/Header.svelte';
	import { loadData } from '$lib/utils/data';
	import '../app.postcss';

	loadData();
</script>

<Header />
<slot />
