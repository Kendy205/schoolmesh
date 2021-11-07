<script>
	export let items = [];
	export let activeTabValue = 1;
	export let members;
	console.log(members);
	export let classID;

	const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<ul class="flex">
	{#each items as item}
		<li class="flex-grow text-center my-8">
			<span
				on:click={handleClick(item.value)}
				class="{activeTabValue === item.value
					? 'text-blue-500 bg-blue-50 border-b-2 border-blue-500'
					: 'border-white text-blue-400'} flex-grow text-center uppercase text-lg px-8 py-4 cursor-pointer transition-all duration-300 border-b-2"
				>{item.label}</span
			>
		</li>
	{/each}
</ul>
{#each items as item}
	{#if activeTabValue == item.value}
		<div class="box">
			<svelte:component this={item.component} {members} {classID} />
		</div>
	{/if}
{/each}
