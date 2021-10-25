<script lang="ts">
	import '../app.css';
	import { getAnalytics } from 'firebase/analytics';
	import { app } from '../lib/firebase';

	// Analytics
	const analytics = getAnalytics(app);
</script>

<slot />
