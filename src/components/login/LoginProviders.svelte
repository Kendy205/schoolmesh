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
		signInWithPopup(auth, provider).then((result) => {
			try {
				sendToDatabase(result.user);
			} catch (e) {
				addNotification({
					text: `Something went wrong. Try refreshing the page </br>${e}`,
					position: 'top-right',
					heading: 'Something wen wrong.',
					type: '',
					removeAfter: 4000
				});
			}
		});
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

	const sendToDatabase = async (user) => {
		const userPrivateRef = doc(db, 'users', `${user.id}`, 'privateInfo', 'data');
		const userPublicRef = doc(db, 'users', `${user.id}`, 'publicInfo', 'data');
		await setDoc(
			userPrivateRef,
			{
				email: user.email,
				lastLogin: serverTimestamp()
			},
			{ merge: true }
		);
		await setDoc(
			userPublicRef,
			{
				displayName: user.displayName,
				photoURL: user.photoURL,
				uid: user.uid
			},
			{ merge: true }
		)
			.then(() => {
				goto('/');
				signInToast();
			})
			.catch((e) => {
				addNotification({
					text: `Try refreshing the page${e}`,
					position: 'top-right',
					heading: 'Something went wrong',
					type: 'error',
					removeAfter: 4000
				});
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
