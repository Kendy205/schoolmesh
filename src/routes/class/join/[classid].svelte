<script context="module">
	import { goto } from '$app/navigation';
	import { t } from 'svelte-i18n';
</script>

<script>
	let classInfo;
	let classID;
	import { page } from '$app/stores';
	import firebase from '@firebase/app';
	import '@firebase/firestore';
	import { firestore } from '../../../firestore';
	import Button from '../../../components/Button.svelte';
	import authStore from '../../../stores/authStore';
	goto('/'); // Kicks in svelte router
	goto(`class/join/${$page.params.classid}`);
	async function getJoinData() {
		classID = $page.params.classid;
		console.log(classID);
		try {
			const db = await firestore();
			db.collection('classes')
				.doc(classID)
				.get()
				.then((doc) => {
					classInfo = doc.data();
					console.log(classInfo);
				});
		} catch (e) {
			console.error(e);
		}
	}
	getJoinData();

	let errorText = '';
	const joinClass = () => {
		const db = firebase.firestore();
		if ($authStore.user !== undefined) {
			console.log(classID);
			db.collection('classes')
				.doc(classID)
				.update({
					members: firebase.firestore.FieldValue.arrayUnion({
						name: $authStore.user.displayName,
						photoURL: $authStore.user.photoURL,
						uid: $authStore.user.uid
					})
				});
			db.collection('users')
				.doc($authStore.user.uid)
				.collection('privateInfo')
				.doc($authStore.user.uid)
				.update({
					classes: firebase.firestore.FieldValue.arrayUnion({
						classID: classID,
						photoURL: classInfo.photoURL,
						desc: classInfo.desc,
						name: classInfo.name
					})
				});
			goto(`/class/${classID}`);
		} else {
			errorText = 'You are not logged in';
		}
	};
</script>

<section class="outline-none">
	{#if $authStore.user !== undefined}
		<h1 class="text-6xl uppercase font-thin text-center p-8">
			{$t('class.join')}
		</h1>
		<div class="text-red-500 text-center">{errorText}</div>
		<section class="full-height">
			{#if classInfo !== undefined}
				<section class="class flex justify-center pt-32">
					<img src={classInfo.photoURL} class="rounded-full h-64 w-64 mb-8 mr-16" alt="" />
					<div class="classinfo mt-8">
						<div class="text-4xl uppercase font-bold ">{classInfo.name}</div>
						<p class="text-gray-700">{classInfo.desc}</p>
						<span on:click={joinClass}>
							<Button color={'bg-blue-500'} link={''}>
								<div class="material-icons" slot="icon">group_add</div>
								Join class
							</Button>
						</span>
					</div>
				</section>{/if}
		</section>
	{:else}
		<div class="text-red-500 text-center">You are not logged in</div>
		<Button color={'bg-blue-500'} link={'/login'}>
			<div class="material-icons" slot="icon">account_circle</div>
			Login Here
		</Button>
	{/if}
</section>
