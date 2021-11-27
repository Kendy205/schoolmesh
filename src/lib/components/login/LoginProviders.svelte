<script lang="ts">
	// @ts-nocheck
	import LoginProvider from './LoginProvider.svelte';
	import { auth, db, googleAuth, facebookAuth, githubAuth } from '../../firebase';
	import { signInWithPopup } from 'firebase/auth';
	import { getNotificationsContext } from 'svelte-notifications';
	const { addNotification } = getNotificationsContext();

	// Signs user in
	function signIn(provider) {
		signInWithPopup(auth, provider);
	}

	// Succes Toast
	const signInToast = () => {
		addNotification({
			text: 'You were successfully signed in',
			position: 'top-right',
			heading: 'Sign in',
			type: '',
			removeAfter: 4000
		});
	};

	// Error Toast
	const errorToast = (e) => {
		addNotification({
			text: `Try refreshing the page </br> ${e}`,
			position: 'top-right',
			heading: 'Something went wrong',
			type: 'error',
			removeAfter: 4000
		});
	};
</script>

<div class="shadow-lg p-8 rounded-md bg-white">
	<h2 class="mb-4">Using your other accounts</h2>
	<span
		on:click={() => {
			signIn(googleAuth);
		}}
	>
		<LoginProvider
			text="Sign in with google"
			bgColor=""
			logo="/social-sites/g-logo.png"
			textColor="black"
		/>
	</span>
	<span
		on:click={() => {
			signIn(facebookAuth);
		}}
	>
		<LoginProvider
			text="Sign in with facebook"
			bgColor="blue-500"
			logo="/social-sites/facebook-logo-white.png"
			textColor="white"
		/>
	</span>
	<span
		on:click={() => {
			signIn(githubAuth);
		}}
	>
		<LoginProvider
			text="Sign in with Github"
			bgColor="black"
			logo="/social-sites/git-logo.png"
			textColor="white"
		/>
	</span>
	<div class="bg-blue-500" />
	<div class="bg-black" />
</div>
