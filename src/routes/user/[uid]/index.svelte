<script context="module">
	import { firestore } from '../../../firestore';
	// Pullování akcí z firestore
	// Returne props events, což je array který se potom iteruje v ui #each
	/* Také by jsme to mohli cachovat aby jsem ušetřili za ready ale to zní jako špatnej nápad protože by jsme toho cachovali až moc
   tak hold budou duplikovaný ready */
	export async function load({ page, fetch, session, context }) {
		let uid = page.params.uid;
		const db = await firestore();
		try {
			const userInformationRef = await db
				.collection('users')
				.doc(uid)
				.collection('publicInfo')
				.doc(uid)
				.get();
			return {
				props: {
					userInformation: userInformationRef.data()
				}
			};
		} catch (error) {
			console.log(error);
		}
	}
	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
</script>

<script>
	import firebase from '@firebase/app';
	import '@firebase/firestore';
	import SocialSites from '../../../components/user/SocialSites.svelte';
	import FavoriteShows from '../../../components/user/FavoriteShows.svelte';
	import MyHobbies from '../../../components/user/MyHobbies.svelte';
	import authStore from '../../../stores/authStore';
	import Button from '../../../components/Button.svelte';

	// Getting user informatio
	export let userInformation;
	console.log(userInformation);
	let header;
	if (userInformation !== undefined) {
		// @ts-ignore
		if (userInformation.header !== undefined) {
			// @ts-ignore
			header = userInformation.header;
		} else {
			header = '/header.png';
		}
	}
</script>

{#if userInformation !== undefined}
	<section>
		<div class="flex justify-center">
			<!-- Basic user information -->
			<section class="w-full md:mt-2 mt-0 md:mx-72 mx-0">
				<div>
					<div
						class="w-full mx-auto rounded-none md:rounded-2xl"
						style="background-image: url({header}); height: 16rem;background-position: center; background-size: cover;"
					/>
					<img
						src={userInformation.photoURL}
						alt=""
						class="w-32 h-32 rounded-full flex justify-center mx-auto z-20"
						style="position:absolute; top: 16rem; left:50%; transform: translate(-50%); border: solid 8px white;"
					/>
				</div>
				<ul>
					<li>
						<div>
							<br /><br /><br />
							<div class="flex-none text-center mb-8">
								<h1 class="text-4xl">{userInformation.displayName}</h1>
								{#if userInformation.caption == undefined}
									<p class="quote-text text-lg">
										{$t('notSetupCaption')}
									</p>
								{:else}
									<p class="quote-text text-lg">
										{userInformation.caption}
									</p>
								{/if}
							</div>
						</div>
					</li>
				</ul>
			</section>
			<!-- Custom user info -->
		</div>
		<section class="flex justify-center md:mt-2 sm:mt-0 md:mx-72 sm:mx-0 max-w-full">
			<div class="grid lg:grid-cols-3 md:grid-cols-1 flex-none w-full">
				<SocialSites {...userInformation} />
				<FavoriteShows {...userInformation} />
				<MyHobbies {...userInformation} />
			</div>
		</section>
	</section>
	{#if $authStore.user !== undefined}
		{#if $authStore.user.uid == userInformation.uid}
			<div class="fixed bottom-1 left-0 text-center w-full">
				<Button color={'bg-blue-500'} link="/user/{$authStore.user.uid}/edit#my_profile">
					<span class="material-icons" slot="icon">edit</span>
					{$t('user.edit-profile')}
				</Button>
			</div>
		{/if}
	{/if}
{/if}
