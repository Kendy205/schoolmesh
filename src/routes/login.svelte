<script lang="ts">
	import Header from '../components/ui/Header.svelte';
	import LoginProvider from '../components/login/LoginProvider.svelte';
	import Button from '../components/ui/Button.svelte';
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
			<LoginProvider
				text="Sign in with google"
				bgColor="white"
				logo="/social-sites/g-logo.png"
				textColor="black"
			/>
			<LoginProvider
				text="Sign in with facebook"
				bgColor="blue-500"
				logo="/social-sites/facebook-logo-white.png"
				textColor="white"
			/>
			<LoginProvider
				text="Sign in with Github"
				bgColor="black"
				logo="/social-sites/git-logo.png"
				textColor="white"
			/>

			<!-- This is here so postccs makes those classes -->
			<div
				class="bg-black bg-blue-500 border-black border-blue-500 scale-0 border-white bg-white"
			/>
		</div>
	</div>
</section>

<style>
</style>
