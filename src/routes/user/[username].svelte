<script lang="ts">
	import { db } from '$lib/firebase';
	import {
		doc,
		DocumentReference,
		DocumentSnapshot,
		getDoc,
		where,
		collection,
		query,
		Query,
		QuerySnapshot,
		getDocs
	} from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Loader from '$lib/components/ui/Loader.svelte';
	import { fade } from 'svelte/transition';
	import Hero from '$lib/components/profile/Hero.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import Bio from '$lib/components/profile/Bio.svelte';
	import Hobbies from '$lib/components/profile/Hobbies.svelte';
	import Favorites from '$lib/components/profile/Favorites.svelte';
	import SocialSites from '$lib/components/profile/SocialSites.svelte';

	interface UserData {
		displayName?: string;
		photoURL?: string;
		uid?: string;
		username?: string;
		profile?: {
			bio?: string;
			socialSites?: Array<{}> | boolean;
			favorites?: Array<{}> | Boolean;
		};
	}

	// Something to store the user data
	let user: UserData;
	let loading: boolean = true;
	let userNotFound: boolean = false;

	onMount(() => {
		const getUserData = async () => {
			const userRef: Query = query(
				collection(db, 'users'),
				where('username', '==', $page.params.username)
			);
			const userSnap: QuerySnapshot = await getDocs(userRef);

			if (!userSnap.empty) {
				userSnap.forEach((doc) => {
					user = doc.data();
				});

				// get additional data for schoolmesh profile
				const meshDataRef: DocumentReference = doc(db, 'users', user.uid, 'schoolmesh', 'profile');
				const meshDataSnapshot: DocumentSnapshot = await getDoc(meshDataRef);
				if (meshDataSnapshot.exists()) {
					user = { ...user, profile: meshDataSnapshot.data() };
					loading = false;
				} else {
					user = { ...user, profile: { bio: 'This user ha not setup', socialSites: false } };
					loading = false;
				}
			} else {
				userNotFound = true;
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
{:else if userNotFound}
	<Header>404</Header>
	This user didnt setup his profile yet
{:else}
	<section transition:fade>
		<Hero {user} />
		<div class="grid md:grid-cols-2 gap-8">
			<span>
				<Bio {user} />
				<Hobbies {user} />
				<Favorites {user} />
			</span>
			<SocialSites {user} />
		</div>
	</section>
{/if}
