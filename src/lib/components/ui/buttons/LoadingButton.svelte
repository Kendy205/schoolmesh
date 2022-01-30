<script lang="ts">
	import { Circle } from 'svelte-loading-spinners';
	import { slide } from 'svelte/transition';

	export let icon: string; // Icon to display from material-icons
	export let bg_color: string = 'meshblue-600'; // Background color don't forget to add the color to tailwind_bundle.svelte so tailwind bundles it if it isn't already used
	export let text_color: string = 'white'; // Color of the text
	export let width: string = ''; // Width default is nothing
	export let disabled: boolean = false; // Toggle if the button is disabled
	export let loading: boolean = false;

	// Calculate ring value
	let [color, value] = bg_color.split('-');
	let colorValue: number = +value;
</script>

<button
	on:click
	class="w-{width} rounded-md flex items-center justify-left p-2 py-3 text-{text_color} 
  duration-300 cursor-pointer mb-4 overflow-hidden
  hover:bg-{color}-{`${colorValue + 100}`}
  {disabled ? 'bg-gray-400 cursor-not-allowed' : `bg-${bg_color}`}"
	{disabled}
>
	<span class="flex items-center">
		<div class="w-6" />
		<!-- this is here for space for the icons -->
		<!-- The icons have to be in absolute otherwise there are weird visual glitches -->
		<div class="absolute">
			<div class="flex items-center">
				{#if !loading}
					<div class="material-icons" out:slide|local={{ duration: 200 }}>
						{icon}
					</div>
				{:else}
					<div transition:slide|local={{ delay: 200, duration: 200 }}>
						<Circle unit="rem" size="1" color="white" />
					</div>
				{/if}
			</div>
		</div>
		<div class="ml-1">
			<slot />
		</div>
	</span>
</button>
