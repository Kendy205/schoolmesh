<script lang="ts">
	export let user;
</script>

<section class="rounded-md bg-white p-8 my-8 shadow-lg">
	<h2>Hobbies</h2>
	<ul>
		{#each user.profile.hobbies as hobby}
			<li>
				{hobby}
			</li>
		{/each}
	</ul>
</section>
