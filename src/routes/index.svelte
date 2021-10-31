<script lang="ts">
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();
</script>

<button
	on:click={() =>
		addNotification({
			text: 'trošku více textu by to chtělo axcsakjdasklůdjasl ůkjdaslůkjdfalůkj',
			position: 'top-right',
			heading: 'Ahoj',
			type: 'error',
			removeAfter: 4000
		})}
>
	Add notification
</button>
