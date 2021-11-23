<script lang="ts">
	//@ts-nocheck
	import NavLogo from './NavLogo.svelte';
	import authStore from '../../authStore';
	import { auth } from '../../firebase';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { getNotificationsContext } from 'svelte-notifications';
	import NavItem from './NavItem.svelte';
	import NavDropdown from './NavDropdown.svelte';
	import NavProfile from './NavProfile.svelte';
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
	class="fixed left-0 md:w-64 md:scale-100 scale-0 bg-meshblue-600 min-h-screen text-white flex flex-col"
>
	<NavLogo />
	<NavItem link="/">Home</NavItem>
	<NavItem link="/classes" icon="school">Classes</NavItem>
	<NavItem link="/chat" icon="message">Chat</NavItem>
	<NavItem link="/notes" icon="description">Notes</NavItem>
	<NavItem link="/homework" icon="task">Homework</NavItem>
	<NavItem link="/settings" icon="settings">Settings</NavItem>
	<div class="flex-grow" />
	<NavProfile />
</nav>
