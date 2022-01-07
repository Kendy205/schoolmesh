<script>
	export let value;
	export let placeholder;
	export let id;
	export let error;
</script>

<div class="relative my-8">
	<input
		type="text"
		bind:value
		placeholder="something"
		{id}
		name="id"
		class="w-64 h-10 rounded-md px-3 py-2 border-2 border-{error
			? 'red-400'
			: 'gray-600'} focus:border-meshblue-500 focus:outline-none focus:ring-0 peer placeholder-transparent"
	/>
	<label
		for={id}
		class="absolute left-0 -top-6 text-base text-gray-600 transition-all duration-300 font-semibold
     peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-gray-600 peer-focus:text-base peer-focus:left-0 peer-placeholder-shown:left-3
  ">{placeholder}</label
	>
</div>
