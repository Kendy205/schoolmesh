<script context="module">
	import { t } from 'svelte-i18n';
</script>

<script lang="ts">
	import authStore from '../../stores/authStore';
	import Button from '../../components/Button.svelte';
	import firebase from '@firebase/app';
	import '@firebase/firestore';
	import '@firebase/storage';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let name;

	// Generating new document to get ID to later upload to FireStorage bucket
	let id;
	onMount(() => {
		if ($authStore.user !== undefined) {
			const db = firebase.firestore();
			const ref = db.collection('classes');
			ref
				.add({
					name: '',
					photoURL: '/logo/white_blue_square.png',
					desc: '',
					members: [],
					admin: $authStore.user.uid
				})
				.then((docRef) => {
					docRef.update({
						id: docRef.id,
						members: [
							{
								uid: $authStore.user.uid,
								name: $authStore.user.displayName,
								photoURL: $authStore.user.photoURL
							}
						]
					});
					id = docRef.id;
				});
		}
	});
	// Upload profile picture
	let profilePicture: any = '/logo/white_blue_square.svg';
	let profilePictureURL: any = '/logo/white_blue_square.svg';
	let fileinputProfilePicture;
	const profilePictureFileChange = (e) => {
		let image = e.target.files[0];
		var storageRef = firebase.storage().ref();
		let ref = storageRef.child(`images/classes/profile_pictures/${id}`);
		ref.put(e.target.files[0]).then((snapshot) => {
			console.log('Uploaded a blob or file!');
			profilePictureURL = `https://firebasestorage.googleapis.com/v0/b/school-notes-3d50f.appspot.com/o/images%2Fclasses%2Fprofile_pictures%2F${id}?alt=media`;
			const db = firebase.firestore();
			const classRef = db.collection('classes').doc(id);
			classRef.set(
				{
					photoURL: profilePictureURL
				},
				{
					merge: true
				}
			);
		});
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			profilePicture = e.target.result;
		};
	};
	let desc;
	let errorText: string = '';
	let createClass = () => {
		if (name !== undefined) {
			if (name.length > 0) {
				const db = firebase.firestore();
				const classRef = db.collection('classes').doc(id);
				classRef.update({
					name: name,
					desc: desc
				});
				const userRef = db
					.collection('users')
					.doc($authStore.user.uid)
					.collection('privateInfo')
					.doc($authStore.user.uid);
				userRef
					.update({
						classes: firebase.firestore.FieldValue.arrayUnion({
							classID: id,
							name: name,
							desc: desc,
							photoURL: profilePictureURL
						})
					})
					.then(() => {
						goto('/class');
						location.reload();
					});
			} else {
				errorText = 'You must enter a name';
			}
		} else {
			errorText = 'You must enter a name';
		}
	};
</script>

{#if $authStore.isLoggedIn}
	<section>
		<ul class="all">
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
							style="object-fit: cover; max-width: 128px; min-height: 8rem;"
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
			<li class="settings-entry text-lg grid place-items-center mb-8  pt-20" id="display-name">
				<ul class="grid place-items-center">
					<li class="text-center mb-4">
						<label for="img" class="text-6xl">Name</label>
						<p class="text-sm text-gray-400 px-4 break-normal mt-4">
							Names your class something creative
							<br />
							<i>Name are limited to 100 characters</i>
						</p>
					</li>

					<div class="inputs">
						<div class="w-58 p-2">
							<input
								minlength="5"
								class="flex-auto sign-in-text text-black outline-none focus:border-blue-500 cursor-text flex p-2 shadow-xl hover:shadow-2xl rounded-md transition-all duration-500 border-2 border-gray-300"
								type="text"
								placeholder="Name"
								bind:value={name}
							/>
						</div>
					</div>
					<p class="text-red-500">
						{errorText}
					</p>
				</ul>
			</li>
			<li class="settings-entry text-lg grid place-items-center mb-8  pt-20" id="description">
				<ul class="grid place-items-center">
					<li class="text-center mb-4">
						<label for="img" class="text-6xl">Description</label>
						<p class="text-sm text-gray-400 px-4 break-normal mt-4">
							Add some description for your class
							<br />
							<i>Descriptions are limited to 200 characters</i>
						</p>
					</li>

					<div class="inputs">
						<div class="w-58 p-2">
							<textarea
								maxlength="200"
								class="flex-auto sign-in-text text-black outline-none focus:border-blue-500 cursor-text flex p-2 shadow-xl hover:shadow-2xl rounded-md border-2 border-gray-300"
								type="text"
								placeholder="Description"
								bind:value={desc}
							/>
						</div>
					</div>
					<li>
						<button class="p-4 cursor-pointer w-full">
							<div
								class="p-1.5 rounded-md w-full text-white shadow-xl hover:shadow-xl bg-blue-500 inline-flex"
								on:click={createClass}
							>
								<span class="material-icons py-1">add</span>
								<p class="px-2">Create Class</p>
								<p />
							</div>
						</button>
					</li>
				</ul>
			</li>
		</ul>
		<div class="mb-32" />
	</section>
{:else}
	<p>You are not loged in login here</p>
{/if}
