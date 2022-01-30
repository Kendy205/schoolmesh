<script lang="ts">
	import NavLogo from './NavLogo.svelte';
	import NavItem from './NavItem.svelte';
	import NavProfile from './NavProfile.svelte';
</script>

<nav
	class="fixed left-0 md:w-64 md:scale-100 scale-0 bg-meshblue-600 min-h-screen text-white flex flex-col"
>
	<NavLogo />
	<NavItem link="/app/">Home</NavItem>
	<NavItem link="/app/classes" icon="school">Classes</NavItem>
	<NavItem link="/app/chat" icon="message">Chat</NavItem>
	<NavItem link="/app/notes" icon="description">Notes</NavItem>
	<NavItem link="/app/homework" icon="task">Homework</NavItem>
	<NavItem link="/app/settings" icon="settings">Settings</NavItem>
	<div class="flex-grow" />
	<NavProfile />
</nav>
