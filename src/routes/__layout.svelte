<script lang="ts" context="module">
	import { waitLocale } from 'svelte-i18n';
	export async function preload() {
		return waitLocale();
	}
</script>

<script lang="ts">
	import '../app.css';
	import { register, init, getLocaleFromNavigator, isLoading } from 'svelte-i18n';
	import Nav from '../components/nav/Nav.svelte';
	import { auth } from '../lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import authStore from '../lib/authStore';
	// Lokalizace
	register('en', () => import('../languages/en.json'));
	register('en-US', () => import('../languages/en-US.json'));
	// Initialize localization
	init({
		initialLocale: getLocaleFromNavigator(),
		fallbackLocale: 'en'
	});

	//Listens for authStatechanges and updates the authStore accordingly
	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			console.log(user);
			authStore.set({
				isLoggedIn: user !== null,
				user
			});
		});
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Spartan:wght@100;200;300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
</svelte:head>

{#if $isLoading}
	<!-- Make is loading component -->
	Please wait
{:else}
	<main class="md:ml-64">
		<Nav />
		<div class="m-12 container">
			<slot />
		</div>
	</main>
{/if}
