<script>
	export let icon = 'home';
</script>

<section
	class="rounded-md hover:bg-meshblue-700 flex items-center p-2 font-semibold cursor-pointer"
>
	<div class="material-icons mr-2">
		{icon}
	</div>
	<slot />
</section>
