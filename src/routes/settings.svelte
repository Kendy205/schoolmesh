<script lang="ts">
	import Input from '../lib/components/ui/Input.svelte';
	import Header from '../lib/components/ui/Header.svelte';
	import Button from '../lib/components/ui/Button.svelte';
	import authStore from '$lib/authStore';
	import Username from '../lib/components/settings/Username.svelte';
</script>

<Header>Settings</Header>
<section>
	<nav class="rounded-md p-2 bg-white mr-8 w-48 fixed col-span-1">
		<h4>Navigation</h4>
		<ul>
			<li>
				<a href="#username">Username</a>
			</li>
		</ul>
	</nav>
	{#if $authStore.isLoggedIn}
		<section class="ml-52">
			<h2 class="mb-4">Profile settings</h2>
			<Username />
		</section>
	{/if}
</section>
