<script lang="ts">
	import Input from '../ui/Input.svelte';

	// Variable for binding
	let name;
	$: {
		console.log(name);
	}
</script>

<section class="shadow-lg p-8 rounded-md bg-white">
	<Input placeholder="Name" bind:value={name} id="name" />
</section>

<style>
</style>
