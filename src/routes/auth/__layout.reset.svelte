<script lang="ts" context="module">
	import { waitLocale } from 'svelte-i18n';
	export async function preload() {
		return waitLocale();
	}
</script>

<script lang="ts">
	// @ts-nocheck
	import '../../app.css';
	import { register, init, getLocaleFromNavigator, isLoading } from 'svelte-i18n';
	import Notifications from 'svelte-notifications';
	import Toast from '$lib/components/ui/Toast.svelte';
	// Lokalizace
	register('en', () => import('../../languages/en.json'));
	register('en-US', () => import('../../languages/en-US.json'));
	// Initialize localization
	init({
		initialLocale: getLocaleFromNavigator(),
		fallbackLocale: 'en'
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Spartan:wght@100;200;300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
		rel="stylesheet"
	/>
</svelte:head>

{#if $isLoading}
	<!-- Make is loading component -->
	Please wait
{:else}
	<Notifications item={Toast}>
		<main>
			<slot />
		</main>
	</Notifications>
{/if}
