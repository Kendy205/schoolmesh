<script lang="ts">
	import NavLogo from './NavLogo.svelte';
	import NavDropdown from './NavDropdown.svelte';
	import NavItem from './NavItem.svelte';
</script>

<nav
	class="fixed top-0 left-0 md:w-64 md:scale-100 scale-0 bg-meshblue-500 shadow-lg h-screen min-h-screen text-white"
>
	<NavLogo />
	<NavDropdown text="home" icon="search">
		<NavItem text="home2" icon="search" link="/" />
		<NavItem text="home2" icon="search" link="/" />
		<NavItem text="home2" icon="search" link="/" />
	</NavDropdown>
	<NavDropdown text="home" icon="search">
		<NavItem text="home2" icon="search" link="/" />
		<NavItem text="home2" icon="search" link="/" />
		<NavItem text="home2" icon="search" link="/" />
	</NavDropdown>
</nav>

<style>
</style>
