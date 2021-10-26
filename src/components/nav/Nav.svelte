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
	<NavDropdown text="home" icon="search">
		<NavItem text="home" icon="home" link="/" />
		<NavItem text="Your account" icon="account_circle" link="/" />
		<NavItem text="People" icon="face" link="/" />
	</NavDropdown>
</nav>

<style>
	.nav-shadow {
		box-shadow: 0 0;
	}
</style>
