<script>
	import Input from '$lib/components/ui/Input.svelte';

	// Variables to bind to
	let name;
</script>

<section class="lg:flex w-screen h-screen">
	<section class="lg:w-1/3 h-screen pl-6 pt-6" style="background-image: url(/background.png);">
		<h1 class="text-white mb-4 overflow-hidden max-w-max">
			Login to <br />
			School Mesh
		</h1>
		<a href="/auth/register">
			<h4 class="text-meshblue-300 hover:border-b-2 border-meshblue-300 max-w-max">
				Dont have an account? Create one here!
			</h4>
		</a>
	</section>

	<section class="grid place-items-center lg:w-2/3 w-full">
		<div class="rounded-md shadow-md p-6 bg-white relative">
			<div class="flex">
				<Input bind:value={name} placeholder="First Name" id="first_name" error={false} />
				<Input bind:value={name} placeholder="First Name" id="first_name" error={false} />
			</div>
			<Input bind:value={name} placeholder="First Name" id="first_name" error={false} />
		</div>
	</section>
</section>
