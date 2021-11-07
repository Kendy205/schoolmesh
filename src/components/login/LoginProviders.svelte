<script lang="ts">
	import LoginProvider from './LoginProvider.svelte';
	import { auth, db, googleAuth, facebookAuth, githubAuth } from '../../lib/firebase';
	import { signInWithPopup } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { setDoc, serverTimestamp, doc } from 'firebase/firestore';
	import { getNotificationsContext } from 'svelte-notifications';
	const { addNotification } = getNotificationsContext();

	// Sign user in
	// @param provider = Firebase login provider
	function signIn(provider) {
		signInWithPopup(auth, provider);
	}

	// A toast confirming user is signed in
	const signInToast = () => {
		addNotification({
			text: 'You were successfully signed in',
			position: 'top-right',
			heading: 'Sign in',
			type: '',
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
			bgColor="white"
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
</div>
