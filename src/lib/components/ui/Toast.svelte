<script>
	import { fade } from 'svelte/transition';
	export let notification = {};
	// `onRemove` function will be passed into your component.
	export let onRemove = null;

	const handleButtonClick = () => {
		onRemove();
	};
</script>

<!-- <div class={notification.type === 'error' ? 'error' : ''}>
	<h4>{notification.heading}</h4>
	<p>{notification.text}</p>
	<button on:click={handleButtonClick}>Close me</button>
</div> -->

<div
	class="p-4 rounded-md m-2 text-white duration-300 {notification.type === 'error'
		? 'bg-red-500'
		: 'bg-meshblue-500'} hover:-translate-y-0.5"
	in:fade
	out:fade
>
	<div class="flex h-full">
		<span>
			<h4 class="text-white mb-1">{notification.heading}</h4>
			<p>{@html notification.text}</p>
		</span>
		<div class="flex-grow" />
		<div class="material-icons cursor-pointer" on:click={handleButtonClick}>close</div>
	</div>
</div>
