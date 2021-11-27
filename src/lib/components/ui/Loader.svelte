<script>
	import { Stretch } from 'svelte-loading-spinners';
	import { fade, fly, slide } from 'svelte/transition';
</script>

<section in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
	<Stretch color="#0C486A" />
</section>
