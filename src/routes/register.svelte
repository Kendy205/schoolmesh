<script lang="ts">
	//@ts-nocheck
	import Header from '../components/ui/Header.svelte';
	import LoginProviders from '../components/login/LoginProviders.svelte';
	import Register from '../components/login/Register.svelte';
	import Button from '../components/ui/Button.svelte';
</script>

<section>
	<Header>Register</Header>

	<div class="grid grid-cols-2 gap-24">
		<Register />
		<LoginProviders />
	</div>
</section>
