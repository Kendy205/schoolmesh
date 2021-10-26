<script lang="ts">
	export let text;
	export let icon;
	export let bgColor;
	export let textColor;
	export let width = '72';
</script>

<div
	class="w-{width} rounded-md leading-8 flex {`bg-${bgColor}`} p-2 align-middle text-{textColor} duration-300 cursor-pointer mb-4"
>
	<div class="material-icons leading-8 mr-2">
		{icon}
	</div>
	{text}
</div>

<style>
</style>
