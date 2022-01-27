<script>
	import Input from '$lib/components/ui/Input.svelte';
	import LoadingButton from '$lib/components/ui/LoadingButton.svelte';
	import { auth, db, storeUserData } from '$lib/firebase';
	import Background from '$lib/components/login/Background.svelte';
	import Checkbox from '$lib/components/ui/CheckBox.svelte';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
	$: {
		if (showPassword) {
			passwordElement = 'text';
			repeatPasswordElement = 'text';
		} else {
			passwordElement = 'password';
			repeatPasswordElement = 'password';
		}
	}

	let parseError = (e) => {
		switch (e) {
			case 'auth/invalid-email':
				emailStatus = {
					error: true,
					note: 'Invalid email'
				};
				break;
		}
	};

	const registerAccount = () => {
		console.log(email, password);
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential;
				console.log(user);
				updateProfile(user.user, {
					displayName: firstName + lastName
				});
				storeUserData(db, user.user, username);
			})
			.catch((e) => {
				console.log(e);
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
				<LoadingButton icon="login" {loading} on:click={registerAccount}
					>Register account</LoadingButton
				>
			</div>
		</form>
	</section>
</section>
