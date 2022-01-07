<script lang="ts">
	import Input from '../ui/Input.svelte';

	let name;
	let email;
</script>

<form class="shadow-lg p-8 rounded-md bg-white">
	<Input placeholder="Name" bind:value={name} id="name" error={false} />
	<Input placeholder="Email" bind:value={email} id="email" error={true} />
</form>
