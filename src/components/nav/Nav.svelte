<script lang="ts">
	import NavLogo from './NavLogo.svelte';
	import NavDropdown from './NavDropdown.svelte';
	import NavItem from './NavItem.svelte';
	import SingleItem from './SingleItem.svelte';
	import authStore from '../../lib/authStore';
	import { auth } from '../../lib/firebase';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { getNotificationsContext } from 'svelte-notifications';
	const { addNotification } = getNotificationsContext();

	function logOut() {
		console.log('logOut');
		signOut(auth)
			.then(() => {
				addNotification({
					text: 'You were successfully logged out',
					position: 'top-right',
					heading: 'Signed out',
					type: '',
					removeAfter: 4000
				});
			})
			.catch((e) => {
				addNotification({
					text: 'Something went wrong please try again in few minutes',
					position: 'top-right',
					heading: 'Something went wrong',
					type: 'error',
					removeAfter: 4000
				});
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
				<NavItem text="Log Out" icon="logout" link="/" />
			</span>
		{:else}
			<NavItem text="Log in" icon="login" link="/login" />
		{/if}
	</NavDropdown>
</nav>
