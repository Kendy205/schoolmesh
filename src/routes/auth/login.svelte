<script>
	import Input from '$lib/components/ui/Input.svelte';
	import LoadingButton from '$lib/components/ui/LoadingButton.svelte';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	// Variables to bind to
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
	let passwordError = false;
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
</script>

<section class="lg:flex w-screen h-screen">
	<section class="lg:w-1/2 h-screen pl-6 pt-6" style="background-image: url(/background.png);">
		<h1 class="text-white mb-4 overflow-hidden max-w-max">
			Login to <br />
			School Mesh
		</h1>
		<a href="/auth/register">
			<h4 class="text-meshblue-300 hover:border-b-2 border-meshblue-300 max-w-max">
				Dont have an account? Create one here!
			</h4>
		</a>
	</section>

	<section class="grid place-items-center lg:w-1/2 w-full">
		<div class="rounded-md shadow-md p-6 bg-white relative">
			<h3 class="text-meshblue-600 mx-2">Welcome Back!</h3>
			<Input
				bind:value={email}
				placeholder="E-mail"
				id="first_name"
				error={emailStatus.error}
				type="email"
				note={emailStatus.note}
			/>
			<Input
				bind:value={password}
				placeholder="Password"
				id="first_name"
				error={passwordStatus.error}
				type="password"
				note={passwordStatus.note}
			/>
			<div class="mx-3">
				<LoadingButton
					icon="login"
					{loading}
					on:click={() => {
						loading = true;
						// Signing procces
						signInWithEmailAndPassword(auth, email, password)
							.then((userCredential) => {
								const user = userCredential.user;
							})
							.catch((error) => {
								parseError(error);
								loading = false;
							});
					}}>Log in</LoadingButton
				>
			</div>
		</div>
	</section>
</section>
