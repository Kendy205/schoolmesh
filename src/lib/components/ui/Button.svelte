<script lang="ts">
	export let icon: string; // Icon to display from material-icons
	export let bg_color: string = 'meshblue-500'; // Background color don't forget to add the color to tailwind_bundle.svelte so tailwind bundles it if it isn't already used
	export let text_color: string = 'white'; // Color of the text
	export let width: string = '72'; // Width default is 72
	export let disabled: boolean = false; // Toggle if the button is disabled
</script>

<button
	on:click
	class="w-{width} rounded-md flex items-center justify-left p-2 pr-3 leading-8 align-middle text-{text_color} text-left {disabled
		? 'bg-gray-400 cursor-not-allowed'
		: `bg-${bg_color}`} duration-300 cursor-pointer mb-4"
	{disabled}
>
	<div class="material-icons mr-2 ">
		{icon}
	</div>
	<slot />
</button>
