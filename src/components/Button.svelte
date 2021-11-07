<script>
	export let link = '';
	export let color = 'bg-blue-500';
</script>

<button class="cursor-pointer py-4">
	<a href={link}>
		<div
			class="mx-auto p-2 rounded-md text-center text-white shadow-xl hover:shadow-xl {color} inline-flex"
		>
			<slot name="icon" />
			<p class="px-2"><slot /></p>
		</div>
	</a>
</button>
