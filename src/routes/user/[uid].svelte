<script lang="ts">
	import { db } from '$lib/firebase';
	import { doc, DocumentReference, DocumentSnapshot, getDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Loader from '$lib/components/ui/Loader.svelte';
	import { fade } from 'svelte/transition';

	interface UserData {
		displayName?: string;
		photoURL?: string;
		uid?: string;
		username?: string;
	}

	// Something to store the user data
	let user: UserData;
	let loading = true;

	// This function gets user data
	onMount(() => {
		const getUserData = async () => {
			const userRef: DocumentReference = doc(db, 'users', $page.params.uid);
			const userSnap: DocumentSnapshot = await getDoc(userRef);

			if (userSnap.exists()) {
				user = userSnap.data();
				loading = false;
			}
		};
		getUserData();
	});
</script>

{#if loading}
	<div class="flex items-center justify-center">
		<Loader />
	</div>
{:else}
	<section class="w-full" transition:fade>
		<div class="hero">
			<div class="flex items-center">
				<img src={user.photoURL} alt="" class="rounded-full z-10" />
				<div class="ml-2">
					<ul>
						<li>
							<h3 class="">{user.displayName}</h3>
							<h6>{user.username}</h6>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
{/if}
