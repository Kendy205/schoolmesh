<script>
	let hobbies;
</script>

{#if hobbies}
	<div
		class="social-sites hover:shadow-2xl shadow-xl duration-500 rounded-md p-1 lg:ml-4 md:m-0 m-8"
	>
		<ul>
			<h1 class="text-center text-2xl mb-2">My Hobbies</h1>
			{#each hobbies as hobby}
				<div class="socialSite inline-block w-full px-2 text-lg list-disc list-inside">
					<li>{hobby}</li>
				</div>
				<br />
			{/each}
		</ul>
		<input
			type="text"
			class="border-2 mx-auto border-gray-300 focus:border-blue-500 rounded-lg p-1"
			placeholder="Add a new hobby"
		/>
	</div>
{/if}
