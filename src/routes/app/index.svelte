<script lang="ts">
	import Button from '$lib/components/ui/buttons/Button.svelte';

	import Header from '$lib/components/ui/Header.svelte';
	import LoadingButton from '$lib/components/ui/buttons/LoadingButton.svelte';
	import SecondaryButton from '$lib/components/ui/buttons/SecondaryButton.svelte';
	import { getNotificationsContext } from 'svelte-notifications';
	import { draw, fade } from 'svelte/transition';

	const { addNotification } = getNotificationsContext();

	let i = false;
	let color = 'none';
	setTimeout(() => {
		i = true;
	}, 5000);

	let visible;
</script>

<Header>Component test</Header>

<Button icon="home">Click me!</Button>
<SecondaryButton icon="home">Click me also!</SecondaryButton>
<LoadingButton icon="home" loading={i}>I even load</LoadingButton>
