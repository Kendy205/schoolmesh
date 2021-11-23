<script lang="ts">
	//@ts-nocheck
	import Header from '../lib/components/ui/Header.svelte';
	import LoginProviders from '../lib/components/login/LoginProviders.svelte';
	import Register from '../lib/components/login/Register.svelte';
	import Button from '../lib/components/ui/Button.svelte';
</script>

<section>
	<Header>Register</Header>

	<div class="grid grid-cols-2 gap-24">
		<Register />
		<LoginProviders />
	</div>
</section>
