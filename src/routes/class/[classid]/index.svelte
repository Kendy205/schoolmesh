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
	import People from '../../../components/classes/tabs/People.svelte';
	import Posts from '../../../components/classes/tabs/Posts.svelte';
	import Tabs from '../../../components/classes/tabs/Tabs.svelte';
	import HomeWork from '../../../components/classes/tabs/HomeWork.svelte';
	import authStore from '../../../stores/authStore';
	goto('/'); // Kicks in svelte router
	goto(`class/${$page.params.classid}`);
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
						photURL: $authStore.user.photoURL,
						uid: $authStore.user.uid
					})
				});
		} else {
			errorText = 'You are not logged in';
		}
	};

	//Tabs
	// List of tab items with labels, values and assigned components
	let items = [
		{ label: 'Posts', value: 1, component: Posts },
		{ label: 'Homework', value: 3, component: HomeWork },
		{ label: 'People', value: 2, component: People }
	];
</script>

{#if $authStore.user !== undefined}
	{#if classInfo !== undefined}
		<div class="grid place-items-center">
			<img src={classInfo.photoURL} alt="" class="w-48 h-48 rounded-full m-8" />
			<h1 class="text-6xl uppercase font-thin text-center p-8">
				{classInfo.name}
			</h1>
			<p>
				{classInfo.desc}
			</p>
		</div>
		<Tabs {items} {...classInfo} {classID} />
	{/if}
{/if}
