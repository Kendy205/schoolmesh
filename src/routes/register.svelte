<script lang="ts">
	//@ts-nocheck
	import Header from '$lib/components/ui/Header.svelte';
	import RegisterForm from '$lib/components/login/RegisterForm.svelte';
</script>

<section>
	<Header>Create your account</Header>
	<div class="grid grid-cols-2 gap-24">
		<RegisterForm />
	</div>
</section>
