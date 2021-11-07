<script>
	import { t } from 'svelte-i18n';
	export let socialSites;
</script>

{#if socialSites}
	<div
		class="social-sites hover:shadow-2xl shadow-xl duration-500 rounded-md p-1 lg:mr-4 md:m-0 m-8"
	>
		<h1 class="text-center text-2xl mb-2">{$t('social-sites')}</h1>
		<ul>
			{#each socialSites as socialSite}
				<div class="socialSite inline-block w-full">
					<a href={socialSite.link}>
						<li class="p-2 flex cursor-pointer">
							<img src={socialSite.icon} alt="" class="p-0.5 w-8 h-8" />
							<p class="text-lg px-2">{socialSite.username}</p>
						</li>
					</a>
				</div>
				<br />
			{/each}
		</ul>
	</div>
{/if}
