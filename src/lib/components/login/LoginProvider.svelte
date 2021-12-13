<script lang="ts">
	export let text;
	export let logo;
	export let bgColor;
	export let textColor;
</script>

<div
	class="w-72 rounded-md flex items-center {`bg-${bgColor}`} p-2 py-3 text-{textColor} duration-300 cursor-pointer my-6 shadow-lg hover:shadow-xl"
>
	<img src={logo} class="h-6 mr-2" alt="" />
	{text}
</div>

<style>
</style>
