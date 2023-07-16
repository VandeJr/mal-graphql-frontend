<script lang="ts">
	import { Hamburger } from 'svelte-hamburgers';
	import HeaderMenu from './HeaderMenu.svelte';

	let open: boolean;
</script>

<header class="bg-slate-500 p-3 header">
	<HeaderMenu />
	<slot />
</header>

<style lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.header {
		display: grid;
		grid-template-columns: 7fr 1fr;
	}
</style>
