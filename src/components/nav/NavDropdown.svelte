<script lang="ts">
	import NavItem from './NavItem.svelte';
	export let text;
	export let icon;

	let height: String = 'h-16 overflow-hidden';
	let hover: String = 'bg-meshblue-700 hover:bg-meshblue-800';
	let rotate: String = 'rotate-0';
	const dropdown = () => {
		if (height == 'h-auto') {
			height = 'h-16 overflow-hidden';
			hover = 'bg-meshblue-700 hover:bg-meshblue-800';
			rotate = 'rotate-0';
		} else {
			height = 'h-auto';
			hover = 'bg-meshblue-500 hover:bg-meshblue-400';
			rotate = 'rotate-180';
		}
	};
</script>

<section
	class="nav-user-item w-full border-b-2 border-meshblue-400 cursor-pointer {height} select-none duration-300"
	on:click={dropdown}
>
	<div class="font-bold text-2xl capitalize align-middle leading-16 pl-2 flex {hover}">
		<span class="material-icons mr-2 select-none font-extrabold leading-16 align-middle">
			{icon}
		</span>
		{text}
		<div class="flex-grow" />
		<div class="pr-4">
			<div class="material-icons leading-16 {rotate} duration-500">expand_more</div>
		</div>
	</div>
	<div class="dropdown">
		<slot />
	</div>
</section>
