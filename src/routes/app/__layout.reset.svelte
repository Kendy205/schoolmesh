<script lang="ts" context="module">
	import { waitLocale } from 'svelte-i18n';
	export async function preload() {
		return waitLocale();
	}
</script>

<script lang="ts">
	// @ts-nocheck
	import '../../app.css';
	import Nav from '$lib/components/nav/Nav.svelte';
	import { isLoading } from 'svelte-i18n';
	import { auth, db } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import authStore from '$lib/authStore';
	import Notifications from 'svelte-notifications';
	import Toast from '$lib/components/ui/Toast.svelte';
	import { doc, DocumentReference, DocumentSnapshot, getDoc } from '@firebase/firestore';
	import userData from '$lib/userData';

	//Listens for authStatechanges and updates the authStore accordingly
	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			authStore.set({
				isLoggedIn: user !== null,
				user
			});

			const getUserData = async () => {
				if (user !== null) {
					const userRef: DocumentReference = doc(db, 'users', user.uid);
					const userDataSnap: DocumentSnapshot = await getDoc(userRef);
					if (userDataSnap.exists) {
						userData.set(userDataSnap.data());
					}
				}
			};
			getUserData();
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
			<div class="container mx-auto p-12">
				<slot />
			</div>
		</main>
	</Notifications>
{/if}
