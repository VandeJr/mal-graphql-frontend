<script lang="ts">
	import { getAnimeList } from '$lib/graphql';
	import type { Anime } from '$lib/models/Anime';
	import AnimeList from '../../components/AnimeList.svelte';
	import Header from '../../components/Header.svelte';

	let search = '';
	let inputText = '';

	/*
	To avoid duplicate animes, a Map was used
	*/
	let animes = new Map<number, Anime>();

	function loadMore(limit: number, offset: number, loaded: Function, complete: Function) {
		getAnimeList(search, limit, offset)
			.then((data) => {
				addAnimes(data);

				if (animes.size >= limit * 5) complete();

				loaded();
			})
			.catch((error) => {
				console.error(error);
				complete();
			});
	}

	function addAnimes(animeList: Anime[]) {
		const newMap = animes;

		animeList.forEach((anime) => newMap.set(anime.id, anime));

		animes = newMap;
	}

	async function searchAnimes() {
		animes = new Map<number, Anime>();

		search = inputText;

		addAnimes(await getAnimeList(search, 28));
	}
</script>

<svelte:head>
	<title>Search</title>
</svelte:head>


<Header>
	<form class="flex py-3" on:submit|preventDefault={searchAnimes}>
		<input class="p-1" placeholder="Search" type="text" bind:value={inputText} />
		<button class="mx-3" type="submit">Search</button>
	</form>
</Header>
<main>
	{#if animes.size === 0}
		<h1>0</h1>
	{:else}
		<AnimeList animes={Array.from(animes.values())} {loadMore} />
	{/if}
</main>

<style lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
