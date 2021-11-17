<script lang="ts" context="module">
	import { waitLocale } from 'svelte-i18n';
	export async function preload() {
		return waitLocale();
	}
</script>

<script lang="ts">
	// @ts-nocheck
	import '../app.css';
	import { register, init, getLocaleFromNavigator, isLoading } from 'svelte-i18n';
	import Nav from '../components/nav/Nav.svelte';
	import { auth, db } from '../lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import authStore from '../lib/authStore';
	import Notifications from 'svelte-notifications';
	import Toast from '../components/ui/Toast.svelte';
	import { doc, DocumentSnapshot, getDoc, where } from '@firebase/firestore';
	import { goto } from '$app/navigation';

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
			authStore.set({
				isLoggedIn: user !== null,
				user
			});

			// Check if the user has a username
			if (user !== null) {
				const usernameSnapshot: DocumentSnapshot = getDoc(
					doc(db, 'usernames'),
					where('uid', '==', $authStore.user.uid)
				);
				let redirected = false;
				// If user has username do nothing
				if (redirected == false) {
					if (usernameSnapshot.exists()) {
						console.log('already has username');
					} else {
						// Redirect him settings, so he set username
						goto('settings');
						redirected = true;
						console.log('redirect');
					}
				}
			}
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
	<link
		href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
		rel="stylesheet"
	/>
</svelte:head>

{#if $isLoading}
	<!-- Make is loading component -->
	Please wait
{:else}
	<Notifications item={Toast}>
		<main class="md:ml-64">
			<Nav />
			<div class="container p-12 w-full">
				<slot />
			</div>
		</main>
	</Notifications>
{/if}
