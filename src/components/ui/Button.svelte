<script lang="ts">
	export let text;
	export let icon;
	export let bgColor;
	export let textColor;
	export let width = '72';
	export let disabled = false;
</script>

<button
	on:click
	class="w-{width} rounded-md flex {`bg-${bgColor}`} p-2 pr-3 leading-8 align-middle text-{textColor} {disabled
		? 'bg-gray-400 cursor-not-allowed'
		: ''} duration-300 cursor-pointer mb-4"
	{disabled}
>
	<div class="material-icons mr-2 align-middle leading-8">
		{icon}
	</div>
	{text}
</button>

<!-- This is here so svelte adds this colour to the final css bundle -->
<div class="bg-gray-400" />

<style>
</style>
