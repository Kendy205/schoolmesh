<script lang="ts">
	import NavLogo from './NavLogo.svelte';
	import authStore from '../../lib/authStore';
	import { auth } from '../../lib/firebase';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { getNotificationsContext } from 'svelte-notifications';
	import NavItem from './NavItem.svelte';
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
	<div class="m-3">
		<NavLogo />
		<NavItem>Home</NavItem>
	</div>
</nav>
