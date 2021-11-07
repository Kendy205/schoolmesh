<script lang="ts">
	import Header from '../components/ui/Header.svelte';
	import LoginProvider from '../components/login/LoginProvider.svelte';
	import Button from '../components/ui/Button.svelte';
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
	<Header text="Log in" />

	<div class="grid grid-cols-2 gap-24">
		<div class="shadow-lg p-8 rounded-md bg-white">
			<h2 class="mb-4">With your mesh account</h2>
			<section>
				<input
					class="w-72 flex-auto sign-in-text p-2 text-black rounded-md border-2 border-mesh-300 focus:border-meshblue-500 outline-none leading-8 mb-4"
					type="text"
					placeholder="E-mail"
				/>
			</section>
			<section>
				<input
					class="w-72 flex-auto sign-in-text p-2 text-black rounded-md border-2 border-mesh-300 focus:border-meshblue-500 outline-none leading-8 mb-4"
					type="password"
					placeholder="password"
				/>
			</section>
			<div class="border-2 border-blue-meshblue-500">
				<Button text="Sign in" bgColor="meshblue-500" icon="search" textColor="white" />
			</div>
		</div>
		<!-- Login Providers -->
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

			<!-- This is here so postccs makes those classes -->
			<div
				class="bg-black bg-blue-500 border-black border-blue-500 scale-0 border-white bg-white"
			/>
		</div>
	</div>
</section>

<style>
</style>
