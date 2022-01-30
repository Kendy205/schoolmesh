<script>
	import { goto } from '$app/navigation';
</script>

<button
	on:click={() => {
		goto('/auth/register');
	}}
	class="mx-2 w-40 rounded-lg hover:rounded-xl flex items-center justify-center border-2 border-white p-2 text-meshblue-600 
  duration-300 cursor-pointer mb-4 bg-white font-bold"
>
	<slot />
</button>
