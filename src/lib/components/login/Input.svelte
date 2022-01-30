<script>
	import { onMount } from 'svelte';

	export let value;
	export let placeholder;
	export let id;
	export let error = false;
	export let type = 'text';
	export let note = '';
	let input;
	let mounted;
	onMount(() => {
		input.type = type;
		mounted = true;
	});

	$: {
		if (mounted) {
			input.type = type;
		}
	}
</script>

<div class="relative my-3 mx-3">
	<input
		type="text"
		bind:value
		bind:this={input}
		placeholder="something"
		{id}
		required
		name="id"
		class="w-full h-10 border-b-2 border-0 p-0 border-b-{error
			? 'red-500'
			: 'gray-600'} focus:border-{error
			? 'red-500'
			: 'meshblue-600'} focus:outline-none focus:ring-0 peer placeholder-transparent"
	/>

	<label
		for={id}
		class="absolute left-0 -top-2.5 bg-white text-sm text-gray-600 transition-all duration-300 pointer-events-none
     peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm
  ">{placeholder}</label
	>
	{#if error}
		<div
			class="absolute top-2.5 right-0 text-{error ? 'red-500' : 'gray-600'} text-s  max-w-full"
			data-bs-toggle="tooltip"
			data-bs-placement="top"
			title={note}
		>
			<div class="material-icons">info</div>
		</div>
	{/if}
</div>
