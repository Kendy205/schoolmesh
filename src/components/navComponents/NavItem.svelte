<script>
	export let link;
</script>

<div
	class="flex-initial hover:bg-white hover:bg-opacity-20 p-2 rounded-md transition cursor-pointer"
>
	<a href={link}><slot /></a>
</div>
