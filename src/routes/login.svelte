<script lang="ts">
	// @ts-nocheck
	import Header from '../lib/components/ui/Header.svelte';
	import LoginProviders from '../lib/components/login/LoginProviders.svelte';
	import Button from '../lib/components/ui/Button.svelte';
	import { auth, db, googleAuth, facebookAuth, githubAuth } from '../lib/firebase';
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

<section>
	<Header>Login</Header>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-24">
		<div class="shadow-lg p-8 rounded-md bg-white">
			<h2 class="mb-4">With your mesh account</h2>
			<ul>
				<li><input class="input-button" type="text" placeholder="E-mail" /></li>
				<li><input class="input-button" type="password" placeholder="Password" /></li>
			</ul>
			<Button bg-color="meshblue-500" icon="search" text-color="white">Sign In</Button>

			<a class="text-gray-500 link" href="/register">Don't have an account? Create one here!</a>
		</div>
		<!-- Login Providers -->
		<LoginProviders />
	</div>
</section>

<style>
	.input-button {
		@apply w-72 flex-auto p-2 text-black rounded-md border-2 border-mesh-300 focus:border-meshblue-500 outline-none leading-8 mb-4;
	}
</style>
