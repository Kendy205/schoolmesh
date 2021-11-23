<script lang="ts">
	import Button from '@lib/components/ui/Button.svelte';
	import Header from '@lib/components/ui/Header.svelte';

	import Input from '@lib/components/ui/Input.svelte';
	import {
		doc,
		DocumentReference,
		DocumentSnapshot,
		getDoc,
		WriteBatch,
		writeBatch
	} from '@firebase/firestore';
	import authStore from '@lib/authStore';
	import { db } from '@lib/firebase';
	import { debounce } from 'lodash';

	let username: string; // something to bind
	let isValid: boolean = false;
	let isAvaiable = false; // Boolean to trigger reading the username
	const re = /^(?=[a-z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/; // :vomit:
	let errorText: string = '';

	// Reactivelly chech if the username is valid
	$: {
		if (username?.length >= 5 && re.test(username)) {
			isValid = true;
			checkUsername();
		} else {
			isValid = false;
			isAvaiable = false;
		}
	}

	// Debounce to chceck if the username is unique
	const checkUsername = debounce(async () => {
		const usernameRef: DocumentReference = doc(db, 'usernames', username);
		const userDoc: DocumentSnapshot = await getDoc(usernameRef);
		console.log('Executed firebase read!');
		if (userDoc.exists()) {
			errorText = 'username is not avaiable';
			isAvaiable = false;
		} else {
			isAvaiable = true;
		}
	}, 500);

	// Submit the username to database
	const onSubmit = async () => {
		const batch: WriteBatch = writeBatch(db);
		const userRef = doc(db, 'users', $authStore.user.uid);
		const usernameRef = doc(db, 'usernames', username);

		batch.set(
			userRef,
			{
				username: username
			},
			{ merge: true }
		);

		batch.set(usernameRef, { uid: $authStore.user.uid });

		await batch.commit();
	};
</script>

<section>
	<h3>Username</h3>
	<ul class="text-gray-700 list-inside list-disc py-2">
		<li>Once you set your username it cant be changed</li>
		<li>Your username must be lowercase</li>
	</ul>
	<form on:submit|preventDefault={onSubmit}>
		<div class="">
			<Input placeholder="username" bind:value={username} on:input{handleInput} />
			<span
				class="material-icons text-{isValid && isAvaiable
					? 'green-500'
					: 'red-500'} align-middle leading-14"
			>
				check_circle
			</span>
		</div>
		<Button icon="upload" disabled={!isAvaiable}>Set username</Button>
		<p class="text-red-500">
			{errorText}
		</p>
	</form>
</section>
