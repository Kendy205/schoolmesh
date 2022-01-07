<script>
	import { onMount } from 'svelte';

	export let value;
	export let placeholder;
	export let id;
	export let error;
	export let type = 'text';
	let input;
	onMount(() => {
		input.type = type;
	});
</script>

<div class="relative my-4 mx-2 w-full">
	<input
		type="text"
		bind:value
		bind:this={input}
		placeholder="something"
		{id}
		name="id"
		class="w-full h-10 rounded-md border-2 border-{error
			? 'red-400'
			: 'gray-600'} focus:border-meshblue-500 focus:outline-none focus:ring-0 peer placeholder-transparent"
	/>
	<label
		for={id}
		class="absolute left-0 -top-6 text-sm text-gray-600 transition-all duration-300 pointer-events-none
     peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-gray-600 peer-focus:text-sm peer-focus:left-0 peer-placeholder-shown:left-3
  ">{placeholder}</label
	>
</div>
