<script>
	export let members;
	console.log(members);
</script>

<div class="grid grid-cols-6 gap-4">
	{#each members as member}
		<a href="/user/{member.uid}">
			<div
				class="w-full rounded-md hover:shadow-xl duration-300  cursor-pointer shadow-md grid place-items-center m-4 p-2"
			>
				<img src={member.photoURL} alt="" class="w-16 h-16 m-2 rounded-full" />
				<p class="name text-2xl py-1.5">
					{member.name}
				</p>
			</div>
		</a>
	{/each}
</div>
