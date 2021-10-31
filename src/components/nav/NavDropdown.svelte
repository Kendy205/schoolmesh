<script lang="ts">
	import NavItem from './NavItem.svelte';
	export let text;

	let height: String = 'h-14 overflow-hidden';
	let hover: String = 'bg-meshblue-600 hover:bg-meshblue-700';
	let rotate: String = 'rotate-0';
	const dropdown = () => {
		if (height == 'h-auto') {
			height = 'h-14 overflow-hidden';
			hover = 'bg-meshblue-600 hover:bg-meshblue-700';
			rotate = 'rotate-0';
		} else {
			height = 'h-auto';
			hover = 'bg-meshblue-500 hover:bg-meshblue-400';
			rotate = 'rotate-180';
		}
	};
</script>

<section
	class="nav-user-item w-full border-b border-meshblue-400 cursor-pointer {height} select-none"
	on:click={dropdown}
>
	<div class="capitalize text-xl font-bold align-middle leading-14 pl-6 flex {hover}">
		{text}
		<div class="flex-grow" />
		<div class="pr-4 leading-14">
			<div class="material-icons leading-14 {rotate} duration-300">expand_more</div>
		</div>
	</div>
	<div class="dropdown bg-meshblue-500 pb-2">
		<slot />
	</div>
</section>
