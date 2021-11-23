<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let icon = 'home';
	export let link;
</script>

<span
	on:click={() => {
		goto(link);
	}}
>
	<section
		class:active={$page.path === link}
		class=" transition-all duration-150 rounded-md hover:bg-meshblue-700 bg-meshblue-600 flex items-center p-2 mx-3 mb-1 font-semibold cursor-pointer text-meshblue-100 hover:text-white"
	>
		<div class="material-icons mr-2">
			{icon}
		</div>
		<slot />
	</section>
</span>

<style>
	section.active {
		@apply bg-meshblue-700 text-white;
	}
</style>
