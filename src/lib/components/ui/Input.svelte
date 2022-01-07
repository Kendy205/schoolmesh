<script>
	export let value;
	export let placeholder;
	export let id;
</script>

<label for={id} class="font-bold text-gray-700">
	{placeholder}
</label>
<br />
<input
	name={id}
	class="w-72 flex-auto px-3 py-2 text-black rounded-md border-2 border-mesh-100
  focus:border-meshblue-500 focus:ring focus:ring-meshblue-300 outline-none my-2 align-middle"
	type="text"
	bind:value
/>
