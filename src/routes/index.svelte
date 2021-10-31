<script lang="ts">
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();
</script>

<button
	on:click={() =>
		addNotification({
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quaerat, alias enim minus quod blanditiis unde. Mollitia harum autem similique repellat quam magni ut quo in, error at, odio placeat.',
			position: 'top-right',
			heading: 'An error occured',
			type: 'error'
		})}
>
	Add notification
</button>
