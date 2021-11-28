<script lang="ts">
	export let user;
	console.log({ user });
	let socialSites = [];

	if (user.profile.socialSites !== undefined) {
		user.profile.socialSites.forEach((ss) => {
			switch (ss.id) {
				case 'instagram':
					socialSites = [
						...socialSites,
						{
							id: 'instagram',
							logo: '/instagram.svg',
							link: `https://instagram.com/${ss.username}`,
							username: ss.username
						}
					];
			}
		});
	}
</script>

<section class="rounded-md bg-white p-8 my-8 shadow-lg">
	<h2>Social Sites</h2>
	{#if socialSites !== undefined}
		{#each socialSites as ss}
			<a href={ss.link}>
				<div
					class="flex items-center rounded-md p-2 shadow-md text-base w-72 cursor-pointer bg-{ss.id} bg-opacity-75 text-white"
				>
					<img src="/social-sites/instagram.svg" class="h-6 mr-2" alt="" />
					@{ss.username}
				</div>
			</a>
		{/each}
	{/if}
</section>
