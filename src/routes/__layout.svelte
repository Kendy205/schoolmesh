<script lang="ts" context="module">
	import { waitLocale } from 'svelte-i18n';
	export async function preload() {
		return waitLocale();
	}
</script>

<script lang="ts">
	import '../app.css';
	import { register, init, getLocaleFromNavigator, isLoading } from 'svelte-i18n';
	import Nav from '../components/nav/Nav.svelte';

	// Lokalizace
	register('en', () => import('../languages/en.json'));
	register('en-US', () => import('../languages/en-US.json'));
	register('cs', () => import('../languages/cs.json'));
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
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
</svelte:head>

{#if $isLoading}
	<!-- Make is loading component -->
	Please wait
{:else}
	<main class="md:ml-64">
		<Nav />
		<div class="mx-8 container">
			<slot />
		</div>
	</main>
{/if}
