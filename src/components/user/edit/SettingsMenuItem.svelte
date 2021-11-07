<script>
	export let link;
</script>

<a href={link}>
	<li class="setting-menu-item flex p-2 hover:bg-gray-100 duration-500 cursor-pointer rounded-lg">
		<slot name="icon" />
		<slot name="text" class="px-2" />
	</li>
</a>

<style>
	* {
		scroll-behavior: smooth;
	}
</style>
