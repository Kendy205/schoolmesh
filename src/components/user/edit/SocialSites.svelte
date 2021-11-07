<script>
	export let userInformation;
</script>

{#if userInformation.socialSites}
	<div
		class="social-sites hover:shadow-2xl shadow-xl duration-500 rounded-md p-1 lg:mr-4 md:m-0 m-8"
	>
		<h1 class="text-center text-2xl mb-2">Social Sites</h1>
		<ul>
			{#each userInformation.socialSites as socialSite}
				{console.log(socialSite)}
				<div class="socialSite inline-block w-full">
					<a href={socialSite.link}>
						<li class="p-2 flex cursor-pointer">
							<img src={socialSite.icon} alt="" class="p-0.5 w-8 h-8" />
							<p class="text-lg px-2">test</p>
						</li>
					</a>
				</div>
				<br />
			{/each}
		</ul>
	</div>
{/if}
