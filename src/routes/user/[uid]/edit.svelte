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

<script lang="ts">
	// @ts-nocheck

	import firebase from '@firebase/app';
	import '@firebase/firestore';
	import '@firebase/storage';
	import SocialSites from '../../../components/user/SocialSites.svelte';
	import FavoriteShows from '../../../components/user/FavoriteShows.svelte';
	import MyHobbies from '../../../components/user/MyHobbies.svelte';
	import authStore from '../../../stores/authStore';
	import Button from '../../../components/Button.svelte';
	import SettingsMenu from '../../../components/user/edit/SettingsMenu.svelte';

	// Getting user informatio
	export let userInformation;
	console.log(userInformation);
	let header;
	let profilePicture;
	let firstName;
	let lastName;
	let caption;
	if (userInformation !== undefined) {
		// @ts-ignore
		if (userInformation.header !== undefined) {
			// @ts-ignore
			header = userInformation.header;
		} else {
			header = '/header.png';
		}
		if (userInformation.photoURL !== undefined) {
			profilePicture = userInformation.photoURL;
		} else {
			profilePicture = '/account_circle.svg';
		}
		if (userInformation.displayName !== undefined) {
			let displayNameArray = userInformation.displayName.split(' ');
			firstName = displayNameArray[0];
			lastName = displayNameArray[1];
		}
		if (userInformation.caption !== undefined) {
			caption = userInformation.caption;
		} else {
			caption = 'This User has not setup his caption';
		}
	}

	//File input
	let fileinputHeader;
	let fileinputProfilePicture;

	const headerFileChange = (e) => {
		let image = e.target.files[0];
		var storageRef = firebase.storage().ref();
		let ref = storageRef.child(`images/users/headers/${$authStore.user.uid}`);
		ref.put(e.target.files[0]).then((snapshot) => {
			console.log('Uploaded a blob or file!');
			const db = firebase.firestore();
			const userRef = db
				.collection('users')
				.doc($authStore.user.uid)
				.collection('publicInfo')
				.doc($authStore.user.uid);
			var storage = firebase.storage();
			userRef.set(
				{
					header: `https://firebasestorage.googleapis.com/v0/b/school-notes-3d50f.appspot.com/o/images%2Fusers%2Fheaders%2F${$authStore.user.uid}?alt=media`
				},
				{ merge: true }
			);
		});
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			header = e.target.result;
		};
	};

	const profilePictureFileChange = (e) => {
		let image = e.target.files[0];
		var storageRef = firebase.storage().ref();
		let ref = storageRef.child(`images/users/profile_pictures/${$authStore.user.uid}`);
		ref.put(e.target.files[0]).then((snapshot) => {
			console.log('Uploaded a blob or file!');
			const db = firebase.firestore();
			const userRef = db
				.collection('users')
				.doc($authStore.user.uid)
				.collection('publicInfo')
				.doc($authStore.user.uid);
			userRef.set(
				{
					photoURL: `https://firebasestorage.googleapis.com/v0/b/school-notes-3d50f.appspot.com/o/images%2Fusers%2Fprofile_pictures%2F${$authStore.user.uid}?alt=media`
				},
				{ merge: true }
			);
			const userToUpdate = firebase.auth().currentUser;
			if (userToUpdate !== undefined) {
				userToUpdate
					.updateProfile({
						photoURL: `https://firebasestorage.googleapis.com/v0/b/school-notes-3d50f.appspot.com/o/images%2Fusers%2Fprofile_pictures%2F${$authStore.user.uid}?alt=media`
					})
					.then(() => {
						console.log('Updated PFP');
					})
					.catch((e) => {
						console.log(e);
					});
			}
		});
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			profilePicture = e.target.result;
		};
	};

	// Name change
	const changeDisplayName = () => {
		const db = firebase.firestore();
		const userRef = db
			.collection('users')
			.doc($authStore.user.uid)
			.collection('publicInfo')
			.doc($authStore.user.uid);
		userRef.set(
			{
				displayName: firstName + ' ' + lastName
			},
			{ merge: true }
		);
		const userToUpdate = firebase.auth().currentUser;
		userToUpdate.updateProfile({
			displayName: firstName + ' ' + lastName
		});
	};
	// Caption Change
	const changeCaption = () => {
		const db = firebase.firestore();
		const userRef = db
			.collection('users')
			.doc($authStore.user.uid)
			.collection('publicInfo')
			.doc($authStore.user.uid);
		userRef.set(
			{
				caption: caption
			},
			{ merge: true }
		);
	};

	// Social Sites
	let socialSites = {
		instagram: {
			name: 'Instagram',
			icon: '/social-sites/instagram-logo.png',
			placeholder: '@username',
			bind: '',
			username: ''
		},
		facebook: {
			name: 'Facebook',
			icon: '/social-sites/facebook-logo.png',
			placeholder: 'facebook.com/username',
			bind: '',
			username: ''
		},
		twitter: {
			name: 'Twitter',
			icon: '/social-sites/twitter-logo.png',
			placeholder: 'twitter.com/username',
			bind: '',
			username: ''
		},
		reddit: {
			name: 'Reddit',
			icon: '/social-sites/reddit-logo.png',
			placeholder: 'reddit.com/reddit_username',
			bind: '',
			username: ''
		},
		website: {
			name: 'WebSite',
			icon: '/social-sites/website-icon.png',
			placeholder: 'example.com',
			bind: '',
			username: ''
		},
		snapchat: {
			name: 'Snapchat',
			placeholder: 'username',
			icon: '/social-sites/snapchat-logo.png',
			bind: '',
			username: ''
		}
	};
	let socialSitesToPush = [];
	const changeSocialSites = () => {
		const db = firebase.firestore();
		const userRef = db
			.collection('users')
			.doc($authStore.user.uid)
			.collection('publicInfo')
			.doc($authStore.user.uid);

		// Instagram
		if (socialSites.instagram.bind.length > 0) {
			socialSites.instagram.link =
				'https://instagram.com/' + socialSites.instagram.bind.split('@').join('');
			socialSites.instagram.username = socialSites.instagram.bind;
			socialSitesToPush = [...socialSitesToPush, socialSites.instagram];
			userRef.set(
				{
					socialSites: socialSitesToPush
				},
				{ merge: true }
			);
		}
		// Twitter
		if (socialSites.twitter.bind.length > 0) {
			socialSites.twitter.link =
				'https://twitter.com/' + socialSites.twitter.bind.split('@').join('');
			socialSites.twitter.username = socialSites.twitter.bind;
			socialSitesToPush = [...socialSitesToPush, socialSites.twitter];
			userRef.set(
				{
					socialSites: socialSitesToPush
				},
				{ merge: true }
			);
		}
		// Reddit
		if (socialSites.reddit.bind.length > 0) {
			socialSites.reddit.link = 'https://reddit.com/' + socialSites.reddit.bind;
			socialSites.reddit.username = socialSites.reddit.bind;
			socialSitesToPush = [...socialSitesToPush, socialSites.reddit];
			userRef.set(
				{
					socialSites: socialSitesToPush
				},
				{ merge: true }
			);
		}
		// Facebook
		if (socialSites.facebook.bind.length > 0) {
			socialSites.facebook.link = socialSites.facebook.bind;
			socialSites.facebook.username = $authStore.user.displayName;
			socialSitesToPush = [...socialSitesToPush, socialSites.facebook];
			userRef.set(
				{
					socialSites: socialSitesToPush
				},
				{ merge: true }
			);
		}
		// Website
		if (socialSites.website.bind.length > 0) {
			socialSites.website.link = socialSites.website.bind;
			socialSites.website.username = socialSites.website.bind;
			socialSitesToPush = [...socialSitesToPush, socialSites.website];
			userRef.set(
				{
					socialSites: socialSitesToPush
				},
				{ merge: true }
			);
		}
		// Snapchat
		if (socialSites.snapchat.bind.length > 0) {
			socialSites.snapchat.username = socialSites.snapchat.bind;
			socialSitesToPush = [...socialSitesToPush, socialSites.snapchat];
			userRef.set(
				{
					socialSites: socialSitesToPush
				},
				{ merge: true }
			);
		}
	};
</script>

{#if userInformation !== undefined}
	<section>
		<div class="grid grid-cols-12 gap-8 mt-16">
			<div class="settings-swicher col-span-2">
				<ul class="rounded-md shadow-md fixed">
					<SettingsMenu />
				</ul>
			</div>
			<div class="setting col-span-10">
				<div class="setting-entries">
					<ul class="divide-solid">
						<h1 class="text-8xl font-bold text-center pt-16" id="my_profile">My Profile</h1>
						<!-- Header -->
						<li class="settings-entry text-lg pt-20" id="header">
							<ul class="w-full grid place-items-center">
								<li class="text-center mb-4">
									<label for="" class="text-center px-4 text-6xl mb-4">Header</label>
									<p class="text-sm text-gray-400 px-4 break-normal mt-4">
										The resolution should be 960px across and 256 down
									</p>
								</li>

								<img
									src={header}
									alt=""
									class="max-h-64 overflow-hidden rounded-md w-full outline-none"
									style="object-fit: cover; max-width: 960px; min-height: 16rem;"
								/>
								<li>
									<button class="p-4 w-full cursor-pointer">
										<div
											class="mx-auto p-1.5 rounded-md w-full text-white shadow-xl hover:shadow-xl bg-blue-500 inline-flex"
											on:click={() => {
												fileinputHeader.click();
											}}
										>
											<span class="material-icons py-1">upload</span>
											<p class="px-2">Upload a Picture</p>
											<p />
										</div>
									</button>
									<input
										type="file"
										class="hidden"
										bind:this={fileinputHeader}
										on:change={(e) => headerFileChange(e)}
										accept=".jpg, .jpeg, .png"
									/>
								</li>
							</ul>
						</li>
						<div class="full-height-divider" />
						<!-- Profile image -->
						<li class="settings-entry text-lg mb-8 grid place-items-c pt-20" id="profile_picture">
							<ul class="grid place-items-center">
								<li class="w-full text-center mb-4">
									<label for="img" class="text-6xl mb-4">Profile Picture</label>
									<p class="text-sm text-gray-400 px-4 break-normal mt-4">
										The profile picture should be a square
									</p>
								</li>

								<div class="flex justify-center">
									<img
										src={profilePicture}
										alt=""
										class="max-h-64 overflow-hidden rounded-full outline-none"
										style="object-fit: cover; max-width: 8rem;  min-width: 8rem;min-height: 8rem;max-height: 8rem"
									/>
								</div>
								<li>
									<button class="text-center w-full p-4 cursor-pointer">
										<div
											class="w-full p-1.5 rounded-md text-white shadow-xl hover:shadow-xl bg-blue-500 inline-flex"
											on:click={() => {
												fileinputProfilePicture.click();
											}}
										>
											<span class="material-icons py-1">upload</span>
											<p class="px-2">Upload a Picture</p>
											<p />
										</div>
									</button>
									<input
										type="file"
										class="hidden"
										bind:this={fileinputProfilePicture}
										on:change={(e) => profilePictureFileChange(e)}
										accept=".jpg, .jpeg, .png"
									/>
								</li>
							</ul>
						</li>
						<div class="full-height-divider" />
						<!-- Display Name -->
						<li
							class="settings-entry text-lg grid place-items-center mb-8  pt-20"
							id="display-name"
						>
							<ul class="grid place-items-center">
								<li class="text-center mb-4">
									<label for="img" class="text-6xl">Name</label>
									<p class="text-sm text-gray-400 px-4 break-normal mt-4">
										Names are limited to 100 characters
									</p>
								</li>

								<div class="inputs">
									<div class="w-58 p-2">
										<input
											class="flex-auto sign-in-text text-black outline-none focus:border-blue-500 cursor-text flex p-2 shadow-xl hover:shadow-2xl rounded-md transition-all duration-500 border-2 border-gray-300"
											type="text"
											placeholder="First Name"
											bind:value={firstName}
										/>
									</div>
									<div class="w-58 p-2">
										<input
											class="flex-auto sign-in-text text-black outline-none focus:border-blue-500 cursor-text flex p-2 shadow-xl hover:shadow-2xl rounded-md transition-all duration-500 border-2 border-gray-300"
											type="text"
											placeholder="Last Name"
											bind:value={lastName}
										/>
									</div>
								</div>
								<li>
									<button class="p-4 cursor-pointer w-full">
										<div
											class="p-1.5 rounded-md w-full text-white shadow-xl hover:shadow-xl bg-blue-500 inline-flex"
											on:click={changeDisplayName}
										>
											<span class="material-icons py-1">save</span>
											<p class="px-2">Save changes</p>
											<p />
										</div>
									</button>
								</li>
							</ul>
						</li>
						<div class="full-height-divider" />
						<div class="flex-grow" />
						<!-- Caption -->
						<li class="settings-entry text-lg pt-20" id="caption">
							<ul class="grid place-items-center">
								<li class="text-center mb-4">
									<label for="img" class="text-6xl">Caption</label>
									<p class="text-sm text-gray-400 px-4 break-normal mt-4">
										Caption are limited to 200 characters
									</p>
								</li>

								<div class="inputs">
									<div class="w-58 p-2">
										<textarea
											rows="5"
											cols="19"
											class="flex-auto sign-in-text text-black outline-none focus:border-blue-500 cursor-text flex p-2 shadow-xl hover:shadow-2xl rounded-md border-2 border-gray-300"
											type="text"
											placeholder="First Name"
											bind:value={caption}
										/>
									</div>
								</div>
								<li>
									<button class="p-4 cursor-pointer w-full">
										<div
											class="p-1.5 rounded-md w-full text-white shadow-xl hover:shadow-2xl bg-blue-500 inline-flex"
											on:click={changeCaption}
										>
											<span class="material-icons py-1">save</span>
											<p class="px-2">Save changes</p>
											<p />
										</div>
									</button>
								</li>
							</ul>
						</li>
						<div class="full-height-divider" />
						<!-- Social Sites -->
						<li class="settings-entry text-lg flex mb-8 w pt-20" id="social_sites">
							<ul class="">
								<li class="text-center mb-8">
									<h1 class="px-4 text-6xl text-center mb-4">Social Sites</h1>
									<p class="text-sm text-gray-400 px-4 break-normal mt-4">
										Add your social sites to connect with your classmates
									</p>
								</li>
								<li class="grid grid-cols-3">
									{#each Object.keys(socialSites) as k}
										<div class="socialSite flex m-2">
											<img src={socialSites[k].icon} alt="" class="h-10 w-10 mr-4" />
											<label for={socialSites[k].name} class="leading-12 align-middle mr-2"
												>{socialSites[k].name}</label
											>
											<div class="flex-grow" />
											<div class="flex-initial">
												<input
													type="text"
													name={socialSites[k].name}
													bind:value={socialSites[k].bind}
													placeholder={socialSites[k].placeholder}
													class="text-black outline-none focus:border-blue-500 cursor-text flex p-2 shadow-xl rounded-md transition-all duration-150 border-2 border-gray-300"
												/>
											</div>
										</div>
									{/each}
								</li>
								<li class="grid place-items-center">
									<button class="p-4 cursor-pointer">
										<div
											class="p-1.5 rounded-md w-full text-white shadow-xl hover:shadow-2xl bg-blue-500 inline-flex"
											on:click={changeSocialSites}
										>
											<span class="material-icons py-1">save</span>
											<p class="px-2">Save changes</p>
										</div>
									</button>
								</li>
							</ul>
						</li>
						<div class="full-height-divider" />
					</ul>
				</div>
			</div>
		</div>
	</section>
{/if}

<style>
	.full-height-divider {
		min-height: 20vh;
	}
	section {
		scroll-behavior: smooth;
	}
</style>
