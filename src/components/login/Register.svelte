<script lang="ts">
	//@ts-nocheck
	import Button from '../ui/Button.svelte';
	import { auth, sendToDatabase } from '../../lib/firebase';
	import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();

	let email: string;
	let password: string;
	let repeatPassword: string;
	let canSignUp: boolean = false;

	// Visibility toggle function
	let visibility: Boolean = false;
	const toggleVisibility = () => {
		visibility = !visibility;
		document.querySelector('#password').type = visibility ? 'text' : 'password';
		document.querySelector('#repeat_password').type = visibility ? 'text' : 'password';
	};

	// Checkmark Variabled
	let eCm: string = 'gray-400';
	let pCm: string = 'gray-400';
	let rPCm: string = 'gray-400';

	// How someone can write this and understand it is beyond me
	let emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	// Pyramid of if hell for signing up
	// Changes the color of the checkmark
	$: {
		//Email error
		if (email !== undefined) {
			if (email.match(emailRegex)) {
				eCm = 'green-500';
			} else {
				eCm = 'gray-400';
			}
		}
		// Password error
		if (password !== undefined) {
			if (password.length >= 6) {
				pCm = 'green-500';
			} else {
				pCm = 'gray-400';
			}
		}

		if (repeatPassword && password !== undefined) {
			if (password == repeatPassword) {
				rPCm = 'green-500';
			} else {
				rPCm = 'gray-400';
			}
		}

		if (eCm && pCm && rPCm == 'green-500') {
			canSignUp = true;
		}
	}

	const signUp = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				sendEmailVerification(user);
				console.log(user);
				sendToDatabase(user)
					.then(() => {
						signInToast();
						goto('/');
					})
					.catch((error) => {
						errorToast(error);
					});
			})
			.catch((error) => {
				let errorText;
				if (error.code == 'auth/email-already-in-use') {
					errorText = 'The email adress is already in use, try another one';
				} else if (error.code == 'auth/weak-password') {
					errorText = 'Your password is too small';
				} else {
					errorText = error;
				}
				errorToast(errorText);
			});
	};

	// Succes Toast
	const signInToast = () => {
		addNotification({
			text: 'You are successfully signed in',
			position: 'top-right',
			heading: 'Sign in',
			type: '',
			removeAfter: 4000
		});
	};

	// Error Toast
	const errorToast = (e) => {
		addNotification({
			text: `${e}`,
			position: 'top-right',
			heading: 'Something went wrong',
			type: 'error',
			removeAfter: 4000
		});
	};
</script>

<section>
	<div class="shadow-lg p-8 rounded-md bg-white">
		<h2 class="mb-4">Create a mesh account</h2>
		<ul>
			<li>
				<input class="input-button" type="text" placeholder="E-mail" bind:value={email} />
				<span class="material-icons text-{eCm} align-middle"> check_circle </span>
			</li>
			<li>
				<input
					class="input-button"
					type="password"
					placeholder="Password"
					bind:value={password}
					id="password"
				/>
				<span class="material-icons text-{pCm} align-middle"> check_circle </span>
			</li>
			<li>
				<input
					class="input-button"
					type="password"
					placeholder="Repeat password"
					bind:value={repeatPassword}
					id="repeat_password"
				/>
				<span class="material-icons text-{rPCm} align-middle"> check_circle </span>
			</li>
			<Button
				text="Toglle passsword visibility"
				bgColor=""
				icon={visibility ? 'visibility' : 'visibility_off'}
				textColor="black"
				on:click={toggleVisibility}
			/>
		</ul>

		<Button
			text="Sign in"
			bgColor="meshblue-500"
			icon="search"
			textColor="white"
			disabled={!canSignUp}
			on:click={signUp}
		/>
		<div class="text-gray-600">
			<ul class="list-disc list-inside">
				<li>Your password must have atleast 6 characters</li>
				<li>It should contain one special character, capital letter and number</li>
			</ul>
			<br />
			<a href="byme.sh/mesh_account" class="hover:underline">What is a mesh account?</a>
		</div>
	</div>
</section>

<style>
	.input-button {
		@apply w-72 flex-auto p-2 text-black rounded-md border-2 border-mesh-300 focus:border-meshblue-500 outline-none leading-8 mb-4;
	}
</style>
