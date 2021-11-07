<script lang="ts">
	import authStore from '../../../stores/authStore';

	import { onMount } from 'svelte';

	import { firestore } from '../../../firestore';
	import Button from '../../Button.svelte';
	import Reply from './Reply.svelte';
	export let classID: string;

	let reply: boolean = false;
	let posts: Array<{
		data: {
			text?: string;
			title?: string;
			author?: { photoURL?: string; name?: string; uid?: string };
		};
		commentID: string;
	}> = [];
	async function getPostsData(classID) {
		const db = await firestore();
		try {
			db.collection('classes')
				.doc(classID)
				.collection('posts')
				.get()
				.then((refSnapshot) => {
					refSnapshot.forEach((doc) => {
						console.log(doc.data());
						let dataToPost = { data: doc.data(), commentID: doc.id };
						posts = [...posts, dataToPost];
					});
				});
		} catch (e) {
			console.log(e);
		}
	}
	onMount(() => {
		getPostsData(classID);
	});

	let title: string;
	let text: string;
	let errorText: string = ' ';
	let postThePost = async () => {
		if (title == undefined || text == undefined) {
			errorText = 'Please put in some text undefined';
		} else if (title !== undefined || text !== undefined) {
			if (title.length < 0 || text.length < 0) {
				console.log(title.length + '|' + text.length);
				errorText = 'Please put in some text málo textu';
			} else {
				console.log('posting');
				errorText = '';
				const db = await firestore();
				try {
					db.collection('classes')
						.doc(classID)
						.collection('posts')
						.add({
							author: {
								name: $authStore.user.displayName,
								uid: $authStore.user.uid,
								photoURL: $authStore.user.photoURL
							},
							text: text,
							title: title
						});
				} catch (error) {
					console.log(error);
				}
			}
		}
	};
</script>

<section>
	<section id="add_post">
		<h1 class="font-bold text-3xl mb-4 w-full">Add a post</h1>
		<div class="text-red-500">
			{errorText}
		</div>
		<input
			type="text"
			placeholder="Title"
			class="outline-none p-2 border-gray-300 border-2 rounded-md my-2 text-xl focus:border-blue-500"
			bind:value={title}
		/>
		<br />
		<textarea
			bind:value={text}
			name=""
			id=""
			cols="30"
			rows="5"
			placeholder="Text for the post"
			class="outline-none p-2 border-gray-300 border-2 rounded-md my-2 text-xl w-full focus:border-blue-500"
		/>
		<span on:click={postThePost}>
			<Button>
				<span class="material-icons" slot="icon">save</span>
				<p>Post the post</p>
			</Button>
		</span>
	</section>
	<section id="posts">
		{#if posts !== undefined}
			{#each posts as post}
				<div class="w-full rounded-md shadow-md my-8 p-4">
					<p class="text-3xl mb-2">{post.data.title}</p>
					<div class="flex">
						<img src={post.data.author.photoURL} alt="" class="w-8 h-8 rounded-full" />
						<p class="text-xl ml-4">{post.data.author.name}</p>
					</div>
					<p class="text-lg">
						{post.data.text}
					</p>

					{#if reply == true}
						<Reply {...post} {classID} />
						<p
							class="text-gray-700 cursor-pointer"
							on:click={() => {
								reply = false;
							}}
						>
							Cancel
						</p>
					{:else}
						<p
							class="text-gray-700 cursor-pointer"
							on:click={() => {
								reply = true;
							}}
						>
							Reply
						</p>
					{/if}
				</div>
			{/each}
		{/if}
	</section>
</section>
