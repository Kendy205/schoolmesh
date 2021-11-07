<script>
	import { t } from 'svelte-i18n';
	export let favoriteShows;
</script>

{#if favoriteShows}
	<div
		class="social-sites hover:shadow-2xl shadow-xl duration-500 rounded-md p-1 lg:mx-2 md:m-0 m-8"
	>
		<h1 class="text-center text-2xl mb-2">{$t('favorite-shows')}</h1>
		<ul>
			{#each favoriteShows as favoriteShow}
				<div class="socialSite inline-block w-full px-2 text-lg list-disc list-inside">
					<li>{favoriteShow}</li>
				</div>
				<br />
			{/each}
		</ul>
	</div>
{/if}
