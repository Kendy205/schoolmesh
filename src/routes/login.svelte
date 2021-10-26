<script lang="ts">
	import Header from '../components/ui/Header.svelte';
	import LoginProvider from '../components/login/LoginProvider.svelte';
	import Button from '../components/ui/Button.svelte';
	import { auth, db, googleAuth, facebookAuth, githubAuth } from '../lib/firebase';
	import { signInWithPopup } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { setDoc, serverTimestamp, doc } from 'firebase/firestore';

	// Sing the user in with specified provider
	const signInWithGoogle = () => {
		console.log('succes');
		signInWithPopup(auth, googleAuth)
			.then((result) => {
				console.log(result.user);
				sendToDatabase(result.user);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const signInWithFacebook = () => {
		signInWithPopup(auth, facebookAuth)
			.then((result) => {
				goto('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const signInWithGithub = () => {
		signInWithPopup(auth, githubAuth)
			.then((result) => {
				goto('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	//Sends the userInfo to database
	const sendToDatabase = async (user) => {
		const userPrivateRef = doc(db, 'users', `${user.id}`, 'privateInfo', 'info');
		const userPublicRef = doc(db, 'users', `${user.id}`, 'publicInfo', 'info');
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
		).then(() => {
			goto('/');
		});
	};
</script>

<section>
	<Header text="Log in" />

	<div class="grid grid-cols-2 gap-24">
		<div class="shadow-lg p-8 rounded-md bg-white">
			<h2 class="mb-4">With your mesh account</h2>
			<section>
				<!-- <h3 class="my-4">Email</h3> -->
				<input
					class="w-72 flex-auto sign-in-text p-2 text-black rounded-md border-2 border-mesh-300 focus:border-meshblue-500 outline-none leading-8 mb-4"
					type="text"
					placeholder="E-mail"
				/>
			</section>
			<section>
				<!-- <h3 class="my-4">Password</h3> -->
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
			<span on:click={signInWithGoogle}>
				<LoginProvider
					text="Sign in with google"
					bgColor="white"
					logo="/social-sites/g-logo.png"
					textColor="black"
				/>
			</span>
			<span on:click={signInWithFacebook}>
				<LoginProvider
					text="Sign in with facebook"
					bgColor="blue-500"
					logo="/social-sites/facebook-logo-white.png"
					textColor="white"
				/>
			</span>
			<span on:click={signInWithGithub}>
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
