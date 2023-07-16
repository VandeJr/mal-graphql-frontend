<script lang="ts">
	import { Hamburger } from 'svelte-hamburgers';

	let open: boolean;
</script>

<div class="flex">
	<Hamburger bind:open />

	{#if open}
		<div class="my-auto">
			<a class="mx-10" href="/">Ranking</a>
			<a class="mx-10" href="/search">Search</a>
			<a class="mx-10" href="/seasons">Seasons</a>
		</div>
	{/if}
</div>

<style lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
