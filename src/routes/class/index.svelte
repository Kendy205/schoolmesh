<script context="module">
	import { t } from 'svelte-i18n';
</script>

<script>
	import { onMount } from 'svelte';
	import { each } from 'svelte/internal';
	import userInfo from '../../stores/userInfo';
	// Get school array
</script>

<section>
	<h1 class="text-6xl uppercase font-thin text-center p-8">
		{$t('class.multiple_message')}
	</h1>
	{#if $userInfo.privateInfo !== undefined}
		<!-- All of the Classe -->
		<section>
			<div class="grid grid-cols-6 gap-8">
				{#if $userInfo.privateInfo.classes !== undefined}
					{#each $userInfo.privateInfo.classes as claz}
						<a href="/class/{claz.classID}">
							<div
								class="claz shadow-md rounded-md hover:shadow-lg duration-300 cursor-pointer p-4  min-h-full max-h-64"
							>
								<div class="grid place-items-center">
									<img
										src={claz.photoURL}
										alt="Class profile"
										class="w-32 h-32 rounded-full"
										style="object-fit: cover;"
									/>
									<h1 class="text-2xl mb-2">
										{claz.name}
									</h1>
									<p class="text-gray-600">
										{claz.desc}
									</p>
								</div>
							</div>
						</a>
					{/each}{/if}
				<a href="/class/create">
					<div
						class="claz shadow-sm rounded-md hover:shadow-md duration-300 cursor-pointer p-4 min-h-full max-h-64"
					>
						<div class="grid place-items-center text-gray-500">
							<div class="text-center">
								<div class="material-icons w-32 h-32 text-8xl p-2">add</div>
							</div>
							<h1 class="text-2xl mb-2">Create new class</h1>
						</div>
					</div>
				</a>
			</div>
		</section>
	{:else}
		<div class="grid place-items-center">
			<div class="warning text-red-500">
				Sorry you are not joined in any classes, join a class here, or create a new class here
			</div>
		</div>
	{/if}
</section>
