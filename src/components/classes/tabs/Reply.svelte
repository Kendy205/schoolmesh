<script lang="ts">
	import firebase from '@firebase/app';
	import '@firebase/firestore';
	export let commentID;
	export let classID;
	import authStore from '../../../stores/authStore';
	import Button from '../../Button.svelte';
	let text: string;
	let replyToComment = () => {
		const db = firebase.firestore();
		db.collection('classes')
			.doc(classID)
			.collection('comments')
			.doc(commentID)
			.set({
				author: {
					name: $authStore.user.displayName,
					photoURL: $authStore.user.photoURL,
					uid: $authStore.user.uid
				},
				text: text
			});
	};
</script>

<textarea
	name=""
	id=""
	cols="30"
	rows="10"
	bind:value={text}
	class="outline-none p-2 border-gray-300 border-2 rounded-md my-2 text-xl focus:border-blue-500"
/> <br />

<span on:click={() => {}}>
	<Button>
		<span class="material-icons" slot="icon"> message </span>
		<p>Reply</p>
	</Button>
</span>
