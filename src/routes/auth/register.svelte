<script>
	import Input from '$lib/components/ui/Input.svelte';
	import LoadingButton from '$lib/components/ui/LoadingButton.svelte';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import Background from '$lib/components/login/Background.svelte';
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
	let passwordStatus = {
		error: false,
		note: ''
	};
	let repeatPassword;
	let repeatPasswordStatus = {
		error: false,
		note: ''
	};

	let loading = false;

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

	const registerAccount = () => {};
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
			<h3 class="text-meshblue-600 mx-2">Welcome Back!</h3>
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
					type="password"
					note={passwordStatus.note}
				/>
				<Input
					bind:value={repeatPassword}
					placeholder="Repeat Password"
					id="repeat_password"
					error={repeatPasswordStatus.error}
					type="password"
					note={repeatPasswordStatus.note}
				/>
			</div>

			<div class="mx-3">
				<LoadingButton icon="login" {loading} on:click={registerAccount}
					>Register account</LoadingButton
				>
			</div>
		</form>
	</section>
</section>
