<script lang="ts">
	import { getSeasonalAnime } from '$lib/graphql';
	import type { Anime } from '$lib/models/Anime';
	import AnimeList from '../../components/AnimeList.svelte';
	import Header from '../../components/Header.svelte';

	let year = '';
	let season = '';
	let sort = '';

	let yearInput = '';
	let seasonInput = '';
	let sortInput = '';
	let animes: Anime[] = [];

	let loaded = false;

	async function seasonalAnime() {
		loaded = true;

		year = yearInput;
		season = seasonInput;
		sort = sortInput;

		animes = await getSeasonalAnime(sort, season, year);
	}

	function loadMore(limit: number, offset: number, loaded: Function, complete: Function) {
		getSeasonalAnime(sort, season, year, limit, offset).then((data) => {
			if (data.length != 28) complete();

			animes = [...animes, ...data];
			loaded();
		});
	}
</script>

<svelte:head>
	<title>Season</title>
</svelte:head>

<Header>
	<form class="grid py-3" on:submit|preventDefault={seasonalAnime}>
		<input placeholder="Year" class="mx-2 p-1" type="number" bind:value={yearInput} />
		<select class="mx-2" bind:value={seasonInput}>
			<option value="" disabled selected>Season</option>
			<option value="winter">Winter</option>
			<option value="spring">Spring</option>
			<option value="summer">Summer</option>
			<option value="fall">Fall</option>
		</select>
		<select class="mx-2" bind:value={sortInput}>
			<option selected={true} value="anime_score">Score</option>
			<option value="anime_num_list_users">Members</option>
		</select>
		<button class="mx-2" type="submit">Search</button>
	</form>
</Header>

<main>
	<div>
		{#if animes.length === 0}
			<h1>0</h1>
		{:else}
			<AnimeList {animes} {loadMore} />
		{/if}
	</div>
</main>

<style lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	form {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	form input,
	select {
		width: 6rem;
	}
</style>
