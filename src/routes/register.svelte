<script lang="ts">
	import { goto } from '$app/navigation';

	import firebase from '@firebase/app';
	import { firestore } from '../firestore';
	import '@firebase/auth';
	import authStore from '../stores/authStore';
	const { serverTimestamp } = firebase.firestore.FieldValue;

	import { t } from 'svelte-i18n';

	// Google Login
	async function googleLogin() {
		try {
			const googleProvider = new firebase.auth.GoogleAuthProvider();
			await firebase.auth().signInWithPopup(googleProvider);
			sendToDatabase();
		} catch (e) {
			console.log(e);
		}
	}
	//Facebook Login
	async function facebookLogin() {
		try {
			var facebookProvider = new firebase.auth.FacebookAuthProvider();
			await firebase.auth().signInWithPopup(facebookProvider);
			sendToDatabase();
		} catch (e) {
			console.log(e);
		}
	}

	//Github Login
	let user;
	async function githubLogin() {
		try {
			var githubProvider = new firebase.auth.GithubAuthProvider();
			await firebase.auth().signInWithPopup(githubProvider);
			sendToDatabase();
		} catch (e) {
			console.log(e); /**/
		}
	}

	// Email password login
	let email: string = '';
	let password: string = '';
	let repeatPassword: string = '';
	let firstName: string = '';
	let lastName: string = '';

	//Validace
	let emailStyle;
	let passwordStyle;
	let repeatPasswordStyle;
	let firstNameStyle;
	let lastNameStyle;

	let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	$: {
		if (email.length > 0) {
			if (email.match(emailRegEx)) {
				emailStyle = 'focus:border-green-500';
			} else {
				emailStyle = 'focus:border-red-500';
			}
		}
		if (password.length > 0) {
			if (password.length >= 12) {
				passwordStyle = 'focus:border-green-500';
			} else {
				passwordStyle = 'focus:border-red-500';
			}
		}
		if (repeatPassword.length > 0) {
			if (password === repeatPassword) {
				repeatPasswordStyle = 'focus:border-green-500';
			} else {
				repeatPasswordStyle = 'focus:border-red-500';
			}
		}
		if (firstName.length > 0) {
			firstNameStyle = 'focus:border-green-500';
		} else {
			firstNameStyle = 'focus:border-red-500';
		}
		if (lastName.length > 0) {
			lastNameStyle = 'focus:border-green-500';
		} else {
			lastNameStyle = 'focus:border-red-500';
		}
	}

	let showPassword = false;
	let showRepeatPassword = false;
	let passwordVisibility = 'password';
	let repeatPasswordVisibility = 'password';

	function revealPassword() {
		showPassword = !showPassword;
		console.log(showPassword, passwordVisibility);
		if (showPassword) {
			passwordVisibility = 'text';
		} else if (!showPassword) {
			passwordVisibility = 'password';
		}
	}

	function revealRepeatPassword() {
		showRepeatPassword = !showRepeatPassword;
		if (showRepeatPassword) {
			repeatPasswordVisibility = 'text';
		} else if (!showRepeatPassword) {
			repeatPasswordVisibility = 'password';
		}
	}

	const handleRepeatPasswordInput = (e) => {
		repeatPassword = e.target.value;
	};

	const handlePasswordInput = (e) => {
		password = e.target.value;
	};

	let emailGood: boolean;
	let passwordGood: boolean;
	let repeatPasswordGood: boolean;
	let errorText = '';
	function validateUserCredentials() {
		if (email.match(emailRegEx)) {
			emailGood = true;
		} else {
			emailGood = false;
		}

		if (password.length > 0) {
			if (password.length >= 12) {
				passwordGood = true;
			} else {
				passwordGood = false;
			}
		} else {
			passwordGood = false;
		}

		if (repeatPassword.length > 0) {
			if (password === repeatPassword) {
				repeatPasswordGood = true;
			} else {
				repeatPasswordGood = false;
			}
		} else {
			repeatPasswordGood = false;
		}

		if (emailGood === true && passwordGood === true && repeatPasswordGood === true) {
			console.log('Valid Credentials');
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then((userCredential) => {
					var user = userCredential.user;
					console.log(user);

					let displayName = firstName + ' ' + lastName;
					user
						.updateProfile({
							displayName: displayName
						})
						.then(() => {
							sendToDatabase();
							location.reload();
							goto('/');
						})
						.catch((error) => {});
				})
				.catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log(errorMessage, errorCode);
					errorText = errorMessage;
				});
		} else {
			console.log('invalid Credentials');
			if (emailGood === false) {
				errorText = $t('register.not-a-valid-email-adress');
			} else if (passwordGood === false) {
				errorText = $t('register.not-a-valid-password');
			} else {
				errorText = $t('register.passwords-dont-match');
			}
		}
	}

	function sendToDatabase() {
		const db = firebase.firestore();
		let currentUser = firebase.auth().currentUser;
		if ($authStore.isLoggedIn) {
			console.log('Sending user data to database' + currentUser);
			let userDocumentRef = db.collection('users').doc(currentUser.uid);
			userDocumentRef.set(
				{
					uid: currentUser.uid,
					displayName: currentUser.displayName,
					photoURL: currentUser.photoURL
				},
				{ merge: true }
			);
			let privateUserDocumentRef = db
				.collection('users')
				.doc(currentUser.uid)
				.collection('privateInfo')
				.doc(currentUser.uid);
			privateUserDocumentRef.set(
				{
					uid: currentUser.uid,
					displayName: currentUser.displayName,
					emailAdress: currentUser.email,
					lastLogin: serverTimestamp()
				},
				{ merge: true }
			);
			goto('/');
		}
	}
</script>

<header>
	<h1 class="text-6xl text-center font-thin p-8">{$t('register.register-to-school-notes')}</h1>
</header>

<section>
	<div class="log-in px-32 justify-center flex">
		<div class="log-in-box">
			<ul>
				<!-- First Name -->
				<li class="w-72 cursor-pointer flex text-p-0.5  m-4 transition-all duration-500">
					<input
						class=" {firstNameStyle} flex-auto sign-in-text p-2 text-black rounded-md shadow-xl border-2 border-gray-300 focus:border-blue-500"
						type="text"
						bind:value={firstName}
						placeholder={$t('register.first-name')}
					/>
					<span class="material-icons py-3 px-2 select-none text-white cursor"> visibility </span>
				</li>
				<!-- Last Name -->
				<li class="w-72 cursor-pointer flex text-p-0.5  m-4 transition-all duration-500">
					<input
						class="{lastNameStyle} flex-auto sign-in-text p-2 text-black shadow-xl rounded-md border-2 border-gray-300 focus:border-blue-500"
						type="text"
						bind:value={lastName}
						placeholder={$t('register.last-name')}
					/>
					<span class="material-icons py-3 px-2 select-none text-white cursor"> visibility </span>
				</li>
				<!-- Email -->
				<li class="w-72 cursor-pointer flex text-p-0.5  m-4 transition-all duration-500">
					<input
						class="flex-auto sign-in-text p-2 text-black shadow-xl rounded-md border-2 border-gray-300 {emailStyle} focus:border-blue-500"
						type="email"
						bind:value={email}
						placeholder="E-mail"
					/>
					<span class="material-icons py-3 px-2 select-none text-white cursor"> visibility </span>
				</li>
			</ul>
		</div>
		<ul>
			<!-- Password -->
			<li class="w-72 cursor-pointer flex text-p-0.5  m-4 transition-all duration-500">
				<input
					class=" {passwordStyle} flex-auto sign-in-text p-2 shadow-xl text-black rounded-md border-2 border-gray-300 focus:border-blue-500"
					type={passwordVisibility}
					on:input={handlePasswordInput}
					placeholder={$t('register.password')}
				/>
				<div class="password-toggle" on:click={revealPassword}>
					{#if passwordVisibility == 'password'}
						<span class="material-icons py-3 px-2 select-none text-gray-400"> visibility </span>
					{:else}
						<span class="material-icons py-3 px-2 select-none text-gray-400"> visibility_off </span>
					{/if}
				</div>
			</li>
			<!-- Repeated password -->
			<li class="w-72 cursor-pointer flex text-p-0.5  m-4 transition-all duration-500">
				<input
					class=" {repeatPasswordStyle} flex-auto sign-in-text shadow-xl p-2 text-black rounded-md border-2 border-gray-300 focus:border-blue-500"
					type={repeatPasswordVisibility}
					on:input={handleRepeatPasswordInput}
					placeholder={$t('register.repeat-password')}
				/>
				<div class="password-toggle" on:click={revealRepeatPassword}>
					{#if repeatPasswordVisibility == 'password'}
						<span class="material-icons py-3 px-2 select-none text-gray-400"> visibility </span>
					{:else}
						<span class="material-icons py-3 px-2 select-none text-gray-400"> visibility_off </span>
					{/if}
				</div>
			</li>

			<!-- Register -->
			<li class="cursor-pointer flex m-4" on:click={validateUserCredentials}>
				<div
					class="register-wrapper bg-blue-500 p-1  shadow-xl hover:shadow-2xl rounded-md  flex-grow"
				>
					<span class="material-icons w-8 h-8 m-2 text-white sign-in-text "> login </span>
					<p class="flex-auto sign-in-text p-2 text-white">{$t('register.register')}</p>
				</div>
				<span class="material-icons py-3 px-2 select-none text-white"> visibility </span>
			</li>
		</ul>
	</div>
	<p class="text-red-400 text-center">
		{errorText}
	</p>
	<p class="text-gray-600 text-center">
		{@html $t('register.password-requirements')}
	</p>
	<header>
		<h2 class="text-4xl text-center font-thin p-8">{$t('register.sign-in-with-providers')}</h2>
	</header>
	<div class="sign-buttons justify-center flex ">
		<div class="log-in-box flex">
			<ul class="flex">
				<!-- Facebook -->
				<li
					class="w-58 cursor-pointer flex p-1 shadow-xl hover:shadow-2xl rounded-md m-4 bg-facebook transition-all duration-500 flex-auto"
					on:click={facebookLogin}
				>
					<img src="/f-logo.png" class="w-8 h-8 m-2" alt="Facebook Logo" />
					<p class="flex-auto sign-in-text p-2 text-white">
						{$t('register.sign-in-with-facebook')}
					</p>
				</li>
				<!-- Google -->
				<li
					class="w-58 cursor-pointer flex p-1 shadow-xl hover:shadow-2xl rounded-md m-4 transition-all duration-500 flex-auto"
					on:click={googleLogin}
				>
					<img src="g-logo.png" class="w-8 h-8 m-2" alt=" Google Logo" />
					<p class="flex-auto sign-in-text p-2">{$t('register.sign-in-with-google')}</p>
				</li>
				<!-- Twitter -->
				<li
					class="w-58 cursor-pointer flex p-1 shadow-xl hover:shadow-2xl rounded-md m-4 bg-github transition-all duration-500 flex-auto"
					on:click={githubLogin}
				>
					<img src="/git-logo.png" class="w-8 h-8 m-2" alt="Github Logo" />
					<p class="flex-auto sign-in-text p-2 text-white">{$t('register.sign-in-with-github')}</p>
				</li>
			</ul>
		</div>
	</div>
	<!--  -->
	<div class="text-center text-gray-600 hover:text-black my-4">
		<a href="/login" class="border-b-2 border-dotted hover:border-none"
			>{$t('register.already-a-user')}</a
		>
	</div>
</section>

<style>
	.sign-in-text {
		display: table-cell;
		line-height: 2rem;
		vertical-align: middle;
	}
	.bg-facebook {
		background: #1877f2;
	}
	.bg-github {
		background: #171515;
	}

	:focus {
		outline: none;
	}
	.cursor {
		cursor: default !important;
	}
</style>
