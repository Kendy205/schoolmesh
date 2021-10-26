<script lang="ts">
	import NavLogo from './NavLogo.svelte';
	import NavDropdown from './NavDropdown.svelte';
	import NavItem from './NavItem.svelte';
	import SingleItem from './SingleItem.svelte';
</script>

<nav
	class="fixed top-0 left-0 md:w-64 md:scale-100 scale-0 bg-meshblue-600 nav-shadow h-screen min-h-screen text-white"
>
	<NavLogo />
	<SingleItem text="home" link="/" />
	<NavDropdown text="Profile" icon="account_circle">
		<NavItem text="Your profile" icon="account_circle" link="/" />
		<NavItem text="Settings" icon="settings" link="/" />
		<div class="h-4" />
		<NavItem text="Sign out" icon="logout" link="/" />
	</NavDropdown>
</nav>

<style>
</style>
