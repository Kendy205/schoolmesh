<script lang="ts">
	export let icon: string; // Icon to display from material-icons
	export let bg_color: string = 'meshblue-600'; // Background color don't forget to add the color to tailwind_bundle.svelte so tailwind bundles it if it isn't already used
	export let text_color: string = 'meshblue-600'; // Color of the text
	export let width: string = ''; // Width default is nothing
	export let disabled: boolean = false; // Toggle if the button is disabled

	// Calculate ring value
	let [color, value] = bg_color.split('-');
	let colorValue: number = +value;
</script>

<button
	on:click
	class="w-{width}  rounded-md flex items-center justify-left p-2 py-3 pr-3 text-{text_color} 
  duration-100 cursor-pointer mb-4 focus:ring-4 focus:ring-{color}-{colorValue - 100}
  hover:bg-{bg_color} hover:text-white border-2
  border-{bg_color}"
	{disabled}
>
	<div class="material-icons mr-2">
		{icon}
	</div>
	<slot />
</button>
