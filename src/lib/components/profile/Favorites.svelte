<script lang="ts">
	export let user;
	console.log({ user });
</script>

<section class="rounded-md bg-white p-8 my-8 shadow-lg">
	<h2>Favorites</h2>
	{#each user.profile.favorites as favorite}
		<h4>{favorite.name}</h4>
		<ul>
			{#each favorite.favorite as favorit}
				<li>{favorit}</li>
			{/each}
		</ul>
	{/each}
</section>
