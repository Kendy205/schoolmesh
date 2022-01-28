<script lang="ts">
	import authStore from '$lib/authStore';
	import { auth } from '$lib/firebase';
	import { signOut, useDeviceLanguage } from 'firebase/auth';
	import privateData from '$lib/privateData';
</script>

<section class="p-2">
	{#if $authStore.isLoggedIn && $privateData !== undefined}
		<div class="flex items-center bg-meshblue-700 p-2 rounded-md">
			<a class="flex items-center" href="user/{$privateData.username}">
				<img
					src={$authStore.user.photoURL}
					alt=""
					class="w-12 h-12 rounded-full mr-2 bg-gray-500"
				/>
				<div class=" leading-tight">
					<div class="font-semibold">{$authStore.user.displayName}</div>
					<div class="font-xs">{$privateData.username}</div>
				</div>
			</a>
			<div class="flex-grow" />
			<span
				on:click={() => {
					signOut(auth);
				}}
			>
				<div class="material-icons cursor-pointer p-1 hover:rounded-xl duration-200">logout</div>
			</span>
		</div>
	{:else}
		<a href="/auth/login">
			<section
				class="rounded-md hover:bg-meshblue-800 bg-meshblue-700 flex items-center p-2 font-semibold cursor-pointer"
			>
				<div class="material-icons mr-2">login</div>
				Log in
			</section>
		</a>
	{/if}
</section>

<style>
</style>
