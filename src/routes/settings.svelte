<script lang="ts">
	import Input from '../components/ui/Input.svelte';
	import Header from '../components/ui/Header.svelte';
	import Button from '../components/ui/Button.svelte';
	let username: string;
</script>

<Header>Settings</Header>
<section class="md:flex">
	<nav class="rounded-md p-2 bg-white mr-8">
		<ul>
			<li>
				<a href="#username">Username</a>
			</li>
		</ul>
	</nav>
	<section>
		<h2 class="mb-4">Profile settings</h2>
		<section>
			<h3>Username</h3>
			<div class="text-gray-700"><b>Note:</b> you can't change your username</div>
			<Input placeholder="@username" bind:value={username} />
			<Button icon="upload">Set username</Button>
		</section>
	</section>
</section>
