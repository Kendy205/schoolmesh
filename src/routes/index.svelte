<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';

	import Header from '$lib/components/ui/Header.svelte';
	import SecondaryButton from '$lib/components/ui/SecondaryButton.svelte';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();
</script>

<Header>Component test</Header>

<Button icon="home">Click me!</Button>
<SecondaryButton icon="home">Click me also!</SecondaryButton>
