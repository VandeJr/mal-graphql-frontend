<script lang="ts">
	import '../app.css';

	import { getAnimeRanking } from '$lib/graphql';
	import type { Anime } from '$lib/models/Anime';
	import AnimeList from '../components/AnimeList.svelte';
	import { onMount } from 'svelte';
	import Header from '../components/Header.svelte';

	let animes: Anime[] = [];
	let rankingType = 'all';
	let rankingTypeInput = 'all';

	function loadMore(limit: number, offset: number, loaded: Function, complete: Function) {
		getAnimeRanking(rankingType, limit, offset).then((data) => {
			if (data.length != limit) complete();

			animes = [...animes, ...data];
			loaded();
		});
	}

	function changeRankingType() {
		animes = [];
		rankingType = rankingTypeInput;
		loadMore(
			28,
			0,
			() => {},
			() => {}
		);
	}

	onMount(() => {
		loadMore(
			28,
			0,
			() => {},
			() => {}
		);
	});
</script>

<svelte:head>
	<title>Ranking</title>
</svelte:head>

<Header>
	<form class="m-auto" on:submit={changeRankingType}>
		<select bind:value={rankingTypeInput}>
			<option value="all" selected={true}>All</option>
			<option value="airing">Airing</option>
			<option value="upcoming">Upcoming</option>
			<option value="tv">TV</option>
			<option value="ova">OVA</option>
			<option value="movie">Movie</option>
			<option value="special">Special</option>
			<option value="bypopularity">By Popularity</option>
			<option value="favorite">Favorite</option>
		</select>
		<button class="px-2" type="submit">Search</button>
	</form>
</Header>
<main>
	{#if animes.length === 0}
		<h1>0</h1>
	{:else}
		<AnimeList {animes} {loadMore} />
	{/if}
</main>
