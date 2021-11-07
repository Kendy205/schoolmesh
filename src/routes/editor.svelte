<script context="module">
	import { t } from 'svelte-i18n';
</script>

<script>
	import TipTap from '../components/TipTap.svelte';
</script>

<h1 class="text-6xl uppercase font-thin text-center p-8">
	{$t('editor.heading')}
</h1>

<section class="flex justify-center">
	<TipTap />
</section>

<style>
</style>
