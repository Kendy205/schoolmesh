<script lang="ts">
	import LandingButton from '$lib/components/landingpage/LandingButton.svelte';
	import SecondaryLandingButton from '$lib/components/landingpage/SecondaryLandingButton.svelte';
	import '../app.css';
	import authStore from '$lib/authStore';
	import { goto } from '$app/navigation';

	if ($authStore.isLoggedIn) {
		goto('/app');
	}
</script>

<main class="h-screen">
	<div class="h-1/2">
		<header
			style="background-image: url(/background_main.png); background-position: center; background-size: cover; background-repeat: no-repeat ;"
			class="min-h-full flex items-center justify-center m-4 rounded-xl"
		>
			<ul>
				<li>
					<h1 class="text-white text-center">School Mesh</h1>
				</li>
				<li class="flex items-center justify-center my-6">
					<LandingButton>Register Account</LandingButton>
					<SecondaryLandingButton>Explore more</SecondaryLandingButton>
				</li>
			</ul>
		</header>
	</div>
</main>
