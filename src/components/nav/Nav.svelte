<script lang="ts">
	import NavLogo from './NavLogo.svelte';
	import NavDropdown from './NavDropdown.svelte';
	import NavItem from './NavItem.svelte';
	import SingleItem from './SingleItem.svelte';
	import authStore from '../../lib/authStore';
	import { auth } from '../../lib/firebase';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';

	function logOut() {
		console.log('logOut');
		signOut(auth)
			.then(() => {
				// TODO: Add toast for succesfule sign out
				goto('/');
			})
			.catch((e) => {
				// TODO: Add toast for error and possibly redirect to error page
			});
	}
</script>

<nav
	class="fixed top-0 left-0 md:w-64 md:scale-100 scale-0 bg-meshblue-600 nav-shadow h-screen min-h-screen text-white"
>
	<NavLogo />
	<SingleItem text="home" link="/" />
	<NavDropdown text="Profile">
		<NavItem text="Your profile" icon="account_circle" link="/" />
		<NavItem text="Settings" icon="settings" link="/" />
		<div class="h-4" />

		{#if $authStore.isLoggedIn}
			<span on:click={logOut}>
				<NavItem text="Sign Out" icon="logout" link="/" />
			</span>
		{:else}
			<NavItem text="Sign in" icon="login" link="/login" />
		{/if}
	</NavDropdown>
</nav>

<style>
</style>
