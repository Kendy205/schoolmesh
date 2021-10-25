<script lang="ts">
	export let text;
	export let icon;
	export let link;
</script>

<section
	class="nav-user-item w-full bg-meshblue-500 hover:bg-meshblue-600 duration-150 cursor-pointer"
>
	<a href={link}>
		<div class="font-bold font-sans capitalize align-middle leading-8 pl-12">
			<span class="material-icons mr-2 select-none font-extrabold leading-8 align-middle">
				{icon}
			</span>
			{text}
		</div>
	</a>
</section>
