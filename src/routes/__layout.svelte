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
	import Nav from '../lib/components/nav/Nav.svelte';
	import { auth, db } from '../lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import authStore from '../lib/authStore';
	import Notifications from 'svelte-notifications';
	import Toast from '../lib/components/ui/Toast.svelte';
	import { doc, DocumentReference, DocumentSnapshot, getDoc } from '@firebase/firestore';
	import privateData from '$lib/privateData';

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

			const getPrivateData = async () => {
				if (user !== null) {
					const privateUserRef: DocumentReference = doc(db, 'users', user.uid, 'private', 'data');
					const privateUserData: DocumentSnapshot = await getDoc(privateUserRef);
					if (privateUserData.exists) {
						privateData.set(privateUserData.data());
					}
				}
			};
			getPrivateData();
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
