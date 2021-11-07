<script context="module">
	import { page } from '$app/stores';
</script>

<script lang="ts">
	import firebase from '@firebase/app';
	import '@firebase/auth';
	import authStore from '../stores/authStore';
	import { t } from 'svelte-i18n';
	import NavItem from './navComponents/NavItem.svelte';
	import { goto } from '$app/navigation';
	import userInfo from '../stores/userInfo';
	console.log($userInfo);

	//Sign Out
	async function signOut() {
		goto('/');
		await firebase.auth().signOut();
		console.log('Signed out');
		location.reload();
	}

	let sidenavOpen: boolean;
	let styleSideNav;
	let styleOverlay;
	//Menu Opening logic
	function openSidenav() {
		sidenavOpen = !sidenavOpen;
		if (sidenavOpen) {
			styleSideNav = 'extended';
			setTimeout(function () {
				styleOverlay = 'nonClickable';
			}, 50);
		} else if (!sidenavOpen) {
			styleSideNav = '';
			styleOverlay = '';
		}
	}

	let userMenuOpen: boolean = false;
	function openUserMenu() {
		userMenuOpen = !userMenuOpen;
	}

	function userMenuSignOut() {
		openUserMenu();
		$authStore.isLoggedIn = false;
		signOut();
	}
	let profilePicture;
	$: if ($authStore.isLoggedIn) {
		if (
			$authStore.user.photoURL == undefined ||
			$authStore.user.photoURL == null ||
			$authStore.user.photoURL == ''
		) {
			profilePicture = false;
		} else {
			profilePicture = true;
		}
	}
</script>

<!-- Navigace -->
<nav class="bg-blue-500 p-3 flex text-white select-none w-full sticky top-0 z-50">
	<span class="material-icons p-2 cursor-pointer" on:click={openSidenav}> menu </span>
	<!-- Logo -->
	<img src="/logo/white_blue_rectangle.jpg" alt="" class="h-10 cursor-pointer" />
	<div class="px-2" />
	<NavItem link={'/'}>{$t('nav.home')}</NavItem>
	<NavItem link={'/editor'}>{$t('nav.editor')}</NavItem>
	<NavItem link={'/class'}>{$t('nav.class')}</NavItem>
	<div class="flex-grow" />
	{#if $authStore.isLoggedIn}
		<div
			class="user flex bg-blue-400 rounded-md cursor-pointer
    "
			on:click={openUserMenu}
		>
			<div class="user-profile-picture flex-initial">
				{#if !profilePicture}
					<span class="material-icons text-2xl m-1">account_circle</span>
				{:else}
					<img
						src={$authStore.user.photoURL}
						alt={$t('nav.profile')}
						class="w-8 h-8 m-1 border-radius rounded-full flex-initial"
					/>{/if}
			</div>
			<div class="user-name-surname flex-initial m-2 font-bold">
				{$authStore.user.displayName}
			</div>
			<div class="username" />
		</div>
	{:else}
		<button class="log-in-button p-2 bg-blue-400 rounded-md px-3">
			<a href={`/login`}>{$t('nav.log-in')}</a>
		</button>
	{/if}
</nav>

{#if userMenuOpen}
	<div class="z-50 inline-block userMenu p-3 fixed">
		<ul class="rounded-md bg-white shadow-lg">
			<li>
				{#if $authStore.isLoggedIn}
					<div class="user flex cursor-pointer select-none" on:click={openUserMenu}>
						<div class="user-profile-picture flex-initial">
							{#if !profilePicture}
								<span class="material-icons text-2xl m-1">account_circle</span>
							{:else}
								<img
									src={$authStore.user.photoURL}
									alt={$t('nav.profile')}
									class="w-8 h-8 m-1 border-radius rounded-full flex-initial"
								/>{/if}
						</div>
						<div class="user-name-surname flex-initial m-2 font-bold">
							{$authStore.user.displayName}
						</div>
					</div>
				{/if}
			</li>
			<div class="my-4" />
			<li class="px-2 flex cursor-pointer">
				<div class="max-w-8 w-8 max-h-8 h-8">
					<span class="material-icons text-2xl">account_circle</span>
				</div>
				<a href={`/user/${$authStore.user.uid}`}
					><p class="text-xl px-1 mx-2 ">{$t('nav.my-profile')}</p></a
				>
			</li>
			<li class="px-2 flex cursor-pointer">
				<div class="max-w-8 w-8 max-h-8 h-8">
					<span class="material-icons text-xl min-w-8">settings</span>
				</div>
				<p class="text-xl px-1 mx-2">{$t('nav.settings')}</p>
			</li>
			<li class="px-2 flex  cursor-pointer min-w8" on:click={userMenuSignOut}>
				<div class="max-w-8 w-8 max-h-8 h-8">
					<span class="material-icons text-xl min-w-8">logout</span>
				</div>
				<p class="text-xl px-1 mx-2">{$t('nav.sign-out')}</p>
			</li>

			<div class="m-4" />
		</ul>
	</div>
{/if}

<!-- Sidenav navigace -->
<div class="z-50 bg-white nav-menu shadow-lg fixed {styleSideNav}">
	<div class="py-8" />
	<ul>
		<li class="p-2 border-l-4 border-blue-500 flex cursor-pointer bg-gray-200">
			<span class="material-icons text-lg text-blue-500">home</span>
			<p class="font-bold text-lg text-blue-500 px-1">{$t('nav.home')}</p>
		</li>
	</ul>
</div>

<!-- Overlay a Sidenav Trigger -->
<div
	class="sidenav-trigger fixed {styleOverlay}"
	on:mouseover={openSidenav}
	on:focus={openSidenav}
/>
<div class="overlay z-40 fixed {styleOverlay}" on:mouseover={openSidenav} on:focus={openSidenav} />

<style>
	.userMenu {
		position: fixed;
		right: 0;
		top: 0;
	}
	.nav-menu {
		position: fixed;
		top: 0;
		left: -20%;
		height: 100vh;
		transition: 0.3s;
		width: 20%;
	}

	.nav-menu ul li {
		background: linear-gradient(90deg, rgba(191, 219, 254, 0.397) 0%, rgba(0, 212, 255, 0) 8%);
		transition: all 0.3s;
	}
	.nav-menu ul li:hover {
		background-color: rgba(229, 231, 235, 50%);
	}
	.overlay {
		pointer-events: none;
		position: fixed;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		opacity: 0;
		background-color: rgba(0, 0, 0, 0.3);
		transition: 0.4s;
	}

	.extended {
		left: 0%;
	}

	.nonClickable {
		opacity: 1;
		pointer-events: all;
	}

	.sidenav-trigger {
		position: fixed;
		width: 1rem;
		height: 100vh;
		pointer-events: all;
	}
</style>
