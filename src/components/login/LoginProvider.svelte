<script lang="ts">
	export let text;
	export let logo;
	export let bgColor;
	export let textColor;
</script>

<div
	class="w-72 rounded-md leading-8 flex {`bg-${bgColor}`} p-2 border-2 {`border-${bgColor}`} align-middle text-{textColor} duration-300 cursor-pointer mb-4"
>
	<img src={logo} class="h-8 mr-2" alt="" />
	{text}
</div>

<style>
</style>
