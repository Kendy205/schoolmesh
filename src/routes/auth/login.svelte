<script>
	import Header from '$lib/components/ui/Header.svelte';
</script>

<section class="lg:flex w-screen h-screen">
	<section class="lg:w-1/2 w-full h-screen p-6" style="background-image: url(/background.png);">
		<h1 class="text-white mb-4">
			Login to <br />
			school.mesh
		</h1>
		<a href="/auth/register">
			<h4 class="text-meshblue-300 hover:underline max-w-max">
				Dont have an account? Create one here!
			</h4>
		</a>
	</section>
</section>
