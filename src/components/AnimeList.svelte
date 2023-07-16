<script lang="ts">
	import type { Anime } from '$lib/models/Anime';
	import InfiniteLoading from 'svelte-infinite-loading';

	export let animes: Anime[];

	let page = 0;
	const items_per_page = 28;

	export let loadMore: Function;

	interface CallbackFn {
		detail: {
			loaded: Function;
			complete: Function;
		};
	}

	function infiniteScrollCallback({ detail: { loaded, complete } }: CallbackFn) {
		page = page + 1;
		loadMore(items_per_page, items_per_page * page, loaded, complete);
	}
</script>

<div class="anime-list gap-1">
	{#each animes as anime, id (anime.id)}
		<div class="anime-card m-2 bg-slate-400 shadow-xl">
			<img
				src={anime.main_picture.medium}
				alt={anime.title}
				height="220"
				width="160"
				class="image"
			/>
			<div class="p-1 px-2">
				<a href="/{anime.id}"
					><h1 class="text-left font-semibold py-0.5 leading-normal title">{anime.title}</h1></a
				>
				<p class="pt-2">Members: {anime.num_list_users.toLocaleString()}</p>
				<p class="py-0.5">Score: {anime.mean ?? 'N/A'}</p>
				<p class="py-0.5">Rank: {anime.rank?.toLocaleString() ?? 'N/A'}</p>
				<a href="https://myanimelist.net/anime/{anime.id}" class="py-0.5">MyAnimeList page</a>
			</div>
		</div>
	{/each}
	<InfiniteLoading on:infinite={infiniteScrollCallback} />
</div>

<style lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.anime-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	}

	.anime-card {
		display: flex;
	}

	.title {
		font-weight: 700;
	}
</style>
