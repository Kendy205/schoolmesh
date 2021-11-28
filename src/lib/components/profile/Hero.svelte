<script lang="ts">
	interface UserData {
		displayName?: string;
		photoURL?: string;
		uid?: string;
		username?: string;
	}
	export let user: UserData;
</script>

<div class="grid place-items-center rounded-md bg-white p-8 mb-8">
	<img src={user.photoURL} alt="" class="rounded-full shadow-lg h-36" />
	<h2 class="mt-8">{user.displayName}</h2>
	<h4>@{user.username}</h4>
</div>
