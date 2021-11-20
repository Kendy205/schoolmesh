<script lang="ts">
	import type { BooleanSupportOption } from 'prettier';

	import NavItem from './NavItem.svelte';

	export let icon;
	export let text;

	let isOpen: boolean = false;

	const open = () => {
		isOpen = !isOpen;
	};
</script>

<section
	class="rounded-md font-semibold cursor-pointer {isOpen ? 'h-auto' : 'h-10'} overflow-hidden"
>
	<div class="flex items-center hover:bg-meshblue-700 rounded-md" on:click={open}>
		<NavItem icon="home">Test</NavItem>
		<div class="flex-grow" />
		<div class="{isOpen ? '-rotate-180' : ''} transition-all duration-150 flex items-center">
			<div class="material-icons">expand_more</div>
		</div>
	</div>
	<div class="dropdown pl-2 mt-0.5">
		<slot />
	</div>
</section>

<style>
</style>
