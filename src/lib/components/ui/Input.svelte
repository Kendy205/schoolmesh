<script>
	export let value;
	export let placeholder;
</script>

<input class="input-button" type="text" {placeholder} bind:value />

<style>
	.input-button {
		@apply w-72 flex-auto p-3 text-black rounded-md border-2 border-mesh-300 focus:border-meshblue-500 outline-none my-2 align-middle;
	}
</style>
