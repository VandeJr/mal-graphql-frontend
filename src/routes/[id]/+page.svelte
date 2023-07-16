<script lang="ts">
	import { page } from '$app/stores';
	import { getAnimeDetails } from '$lib/graphql';
	import type { Anime, Genre } from '$lib/models/Anime';
	import { onMount } from 'svelte';
	import Header from '../../components/Header.svelte';

	let anime: Anime;

	let loaded = false;

	onMount(async () => {
		anime = await getAnimeDetails($page.params.id);
		loaded = true;
	});

	function formatType(type: string) {
		const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

		return type.length <= 3 ? type.toUpperCase() : capitalizeFirstLetter(type);
	}

	function formatGenres(genres: Genre[]): string {
		return genres.map((genre) => genre.name).join(', ');
	}
</script>

<svelte:head>
	{#if !loaded}
		<title>Loading {$page.params.id}</title>
	{:else}
		<title>{anime.title}</title>
	{/if}
</svelte:head>
<Header />
<div class="m-2 flex">
	{#if loaded}
		<img src={anime.main_picture.large} alt={anime.title} width="450" height="600" />
		<div class="m-2">
			<div class="mx-1">
				<h1 class="text-lg font-semibold">{anime.title}</h1>
				<p class="py-1 jap">Japanese: {anime.alternative_titles.ja}</p>
				<p class="py-1">Alternative titles: {anime.alternative_titles.synonyms}</p>
				<br />
				<div class="synopsis">
					{#each anime.synopsis.split('\n\n') as paragraph}
						<p class="indent-5">{paragraph}</p>
						<br />
					{/each}
				</div>
			</div>
			<div class="mx-1 inline-flex">
				<p class="px-1">Members: {anime.num_list_users.toLocaleString()}</p>
				<p class="px-1">Mean score: {anime.mean ?? 'N/A'}</p>
				<p class="px-1">Rank: {anime.rank?.toLocaleString() ?? 'N/A'}</p>
				<p class="px-1">Type: {formatType(anime.media_type) ?? 'N/A'}</p>
				<p class="px-1">Studios: {formatGenres(anime.studios)}</p>
				<p class="px-1">Genres: {formatGenres(anime.genres)}</p>
			</div>
		</div>
	{:else}
		<p style="color: red">Loading</p>
	{/if}
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.jap {
		font-family: 'Zen Kaku Gothic New', 'Manrope', sans-serif;
	}
</style>
