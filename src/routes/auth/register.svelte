<script>
	import { getNotificationsContext } from 'svelte-notifications';
	import Input from '$lib/components/ui/Input.svelte';
	import LoadingButton from '$lib/components/ui/LoadingButton.svelte';
	import { auth, db, storeUserData } from '$lib/firebase';
	import Background from '$lib/components/login/Background.svelte';
	import Checkbox from '$lib/components/ui/CheckBox.svelte';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import debounce from 'lodash.debounce';
	import { collection, doc, getDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	// Variables to bind to
	let firstName;
	let lastName;
	let username;
	let usernameStatus = {
		error: false,
		note: ''
	};
	let email;
	let emailStatus = {
		error: false,
		note: ''
	};
	let password;
	let passwordElement;
	let passwordStatus = {
		error: false,
		note: ''
	};
	let repeatPassword;
	let repeatPasswordElement;
	let repeatPasswordStatus = {
		error: false,
		note: ''
	};

	let loading = false;
	let showPassword = false;
	// showing password
	$: {
		if (showPassword) {
			passwordElement = 'text';
			repeatPasswordElement = 'text';
		} else {
			passwordElement = 'password';
			repeatPasswordElement = 'password';
		}
	}

	// pyramid of if hell
	$: {
		if (password !== undefined) {
			passwordValidation();
		}
		if (repeatPassword !== undefined) {
			repeatPasswordValidation();
		}

		if (username !== undefined) {
			usernameValidation();
		}

		if (email !== undefined) {
			emailValidation();
		}
	}

	let passwordValidation = debounce(() => {
		if (password.length < 10) {
			passwordStatus = {
				error: true,
				note: 'Password must be longer than 10 characters'
			};
		} else {
			passwordStatus = {
				error: false,
				note: ''
			};
		}
	}, 500);

	let repeatPasswordValidation = debounce(async () => {
		if (repeatPassword !== password) {
			repeatPasswordStatus = {
				error: true,
				note: "The passwords don't match'"
			};
		} else {
			repeatPasswordStatus = {
				error: false,
				note: ''
			};
		}
	}, 500);

	let usernameValidation = debounce(async () => {
		if (username.length >= 5 && username.length <= 15) {
			const usernameRef = doc(db, 'usernames', username);
			const usernameSnapshot = await getDoc(usernameRef);
			console.log('Searching for the username');

			if (usernameSnapshot.exists()) {
				console.log(usernameSnapshot.exists());
				usernameStatus = {
					note: 'This username is already taken',
					error: true
				};
			} else {
				console.log('doesnt exist');
				usernameStatus = {
					note: '',
					error: false
				};
			}
		} else {
			usernameStatus = {
				note: 'Invalid username',
				error: true
			};
		}
	}, 500);

	let emailValidation = debounce(() => {
		const re =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if (email.match(re)) {
			emailStatus = {
				error: false,
				note: ''
			};
		} else {
			emailStatus = {
				error: true,
				note: 'Invalid Email'
			};
		}
	}, 500);

	let parseError = (e) => {
		switch (e) {
			case 'auth/invalid-email':
				emailStatus = {
					error: true,
					note: 'Invalid email'
				};
				break;
			case 'auth/email-already-in-use':
				emailStatus = {
					error: true,
					note: 'Email already in use'
				};
				break;
			default:
				const { addNotification } = getNotificationsContext();
				addNotification({
					text: `ERROR_CODE:${e}`,
					position: 'top-right',
					heading: 'Something went wrong',
					type: 'error',
					removeAfter: 4000
				});
		}
	};

	const registerAccount = async () => {
		console.log(email, password);
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential;
				console.log(user);
				updateProfile(user.user, {
					displayName: firstName + ' ' + lastName,
					photoURL: `https://avatars.dicebear.com/api/bottts/${username}.svg`
				}).then(() => {
					goto('/');
				});
				storeUserData(db, user.user, username, firstName + ' ' + lastName);
			})
			.catch((e) => {
				parseError(e);
			});
	};
</script>

<section class="lg:flex w-screen h-screen">
	<Background>
		<h1 class="text-white">Register your mesh account!</h1>
	</Background>

	<section class="grid place-items-center lg:w-1/2 w-full">
		<form
			on:submit|preventDefault={registerAccount}
			class="rounded-md shadow-md p-6 bg-white relative"
		>
			<h3 class="text-meshblue-600 mx-2">Create your account</h3>
			<div class="flex">
				<Input
					bind:value={firstName}
					placeholder="First name"
					id="first_name"
					error={false}
					type="text"
				/>
				<Input
					bind:value={lastName}
					placeholder="Last name"
					id="last_name"
					error={false}
					type="text"
				/>
			</div>

			<div class="flex">
				<Input
					bind:value={username}
					placeholder="Username"
					id="username"
					error={usernameStatus.error}
					type="text"
					note={usernameStatus.note}
				/>
				<Input
					bind:value={email}
					placeholder="E-mail"
					id="first_name"
					error={emailStatus.error}
					type="email"
					note={emailStatus.note}
				/>
			</div>

			<div class="flex">
				<Input
					bind:value={password}
					placeholder="Password"
					id="first_name"
					error={passwordStatus.error}
					type={passwordElement}
					note={passwordStatus.note}
				/>
				<Input
					bind:value={repeatPassword}
					placeholder="Repeat Password"
					id="repeat_password"
					error={repeatPasswordStatus.error}
					type={repeatPasswordElement}
					note={repeatPasswordStatus.note}
				/>
			</div>

			<div class="flex items-start mb-6 mx-3">
				<div class="flex items-center h-5">
					<input
						id="password"
						bind:checked={showPassword}
						aria-describedby="password"
						type="checkbox"
						class="w-4 h-4 bg-gray-50 rounded border-2 border-gray-300 focus:ring-0 checked:bg-meshblue-600 hover:checked:bg-meshblue-600 focus:checked:bg-meshblue-600"
					/>
				</div>
				<div class="ml-3 text-sm">
					<label for="password" class="font-medium text-gray-900 ">Show password</label>
				</div>
			</div>

			<Checkbox />

			<div class="mx-3">
				<LoadingButton icon="login" {loading}>Register account</LoadingButton>
			</div>
		</form>
	</section>
</section>
