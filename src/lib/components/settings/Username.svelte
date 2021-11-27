<script lang="ts">
	import Button from '@lib/components/ui/Button.svelte';
	import Header from '@lib/components/ui/Header.svelte';

	import Input from '@lib/components/ui/Input.svelte';
	import { doc, DocumentReference, DocumentSnapshot, getDoc } from '@firebase/firestore';
	import authStore from '@lib/authStore';
	import { functions, db } from '@lib/firebase';
	import { debounce, identity } from 'lodash';
	import { httpsCallable } from 'firebase/functions';
	import Loader from '@components/ui/Loader.svelte';
	import { fade, fly, slide } from 'svelte/transition';

	let username: string; // something to bind
	let isValid: boolean = false;
	let isAvaiable = false; // Boolean to trigger reading the username
	let isChecking = false;
	const re = /^(?=[a-z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/; // :vomit:
	let errorText: string = '';

	// Reactivelly chech if the username is valid
	$: {
		if (username?.length >= 5) {
			isChecking = true;
		} else {
			isChecking = false;
		}

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
		if (username?.length > 3) {
			const usernameRef: DocumentReference = doc(db, 'usernames', username);
			const userDoc: DocumentSnapshot = await getDoc(usernameRef);
			console.log('Executed firebase read!');
			if (userDoc.exists()) {
				errorText = 'username is not avaiable';
				isAvaiable = false;
				isChecking = false;
			} else {
				isChecking = false;
				isAvaiable = true;
			}
		}
	}, 500);

	// Submit the username to database
	const onSubmit = async () => {
		const createUsername = httpsCallable(functions, 'createUsername');
		createUsername({ text: username })
			.then((result) => {
				// Read result of the Cloud Function.
				/** @type {any} */
				const data: any = result.data;
				const sanitizedMessage = data?.text;
				console.log({ data });
			})
			.catch((e) => {
				console.log(e);
			});
	};
</script>

<section>
	<h3>Username</h3>
	<ul class="text-gray-700 list-inside list-disc py-2">
		<li>Once you set your username it cant be changed</li>
		<li>Your username must be lowercase</li>
	</ul>
	<form on:submit|preventDefault={onSubmit}>
		<div class="w-min">
			<div class="flex items-center">
				<Input placeholder="username" bind:value={username} on:input{handleInput} />
				{#if isChecking == true}
					<Loader />
				{:else}
					<!-- The delay is here so it doesn't cause weird visual glitches -->
					<span
						in:slide={{ delay: 500, duration: 200 }}
						class="material-icons ml-2 {isValid && isAvaiable ? 'text-green-500' : 'scale-0'}"
					>
						check_circle
					</span>
				{/if}
			</div>
		</div>
		<Button icon="upload" disabled={!isAvaiable}>Set username</Button>
		<p class="text-red-500">
			{errorText}
		</p>
	</form>
</section>
