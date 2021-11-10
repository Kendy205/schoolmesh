<script lang="ts">
	export let text; // Displayed text
	export let icon; // Icon to display from material-icons
	export let bgColor = 'meshblue-500'; // Background color don't forget to add the color to tailwind_bundle.svelte so tailwind bundles it if it isn't already used
	export let textColor = 'white'; // Color of the text
	export let width = '72'; // Width default is 72
	export let disabled = false; // Toggle if the button is disabled
</script>

<button
	on:click
	class="w-{width} rounded-md flex items-center justify-left {`bg-${bgColor}`} p-2 pr-3 leading-8 align-middle text-{textColor} text-left {disabled
		? 'bg-gray-400 cursor-not-allowed'
		: ''} duration-300 cursor-pointer mb-4"
	{disabled}
>
	<div class="material-icons mr-2 ">
		{icon}
	</div>
	{text}
</button>

<!-- This is here so svelte adds this colour to the final css bundle -->
<div class="bg-gray-400" />

<style>
</style>
