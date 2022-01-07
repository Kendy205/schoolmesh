<script lang="ts">
	import Input from '../ui/Input.svelte';
	let firstName;
	let lastName;
	let email;
</script>

<form class="shadow-lg p-8 rounded-md bg-white">
	<div class="md:flex">
		<Input placeholder="First Name" bind:value={firstName} id="name" error={false} />
		<Input placeholder="Last Name" bind:value={lastName} id="name" error={false} />
	</div>
	<div class="flex">
		<!-- Proč to KURVAAAAAAAAAAAAAAAAA tohle fixlo nevím -->
		<Input placeholder="E-mail" id="email" bind:value={email} error={false} type="email" />
	</div>
</form>
