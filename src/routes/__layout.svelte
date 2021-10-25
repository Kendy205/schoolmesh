<script lang="ts" context="module">
	import { waitLocale } from 'svelte-i18n';
	export async function preload() {
		return waitLocale();
	}
</script>

<script lang="ts">
	import '../app.css';
	import { register, init, getLocaleFromNavigator, isLoading } from 'svelte-i18n';
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

<main>
	<slot />
</main>
