<script lang="ts">
	export let text;
	export let icon;
	export let link;
</script>

<section class="nav-user-item w-full bg-meshblue-500 hover:bg-meshblue-600 cursor-pointer">
	<a href={link}>
		<div class="font-sans capitalize align-middle leading-8 pl-6 font-bold text-sidenav">
			<span class="material-icons mr-2 select-none leading-8 font-bold align-middle icon-sidenav">
				{icon}
			</span>
			{text}
		</div>
	</a>
</section>

<style>
	.text-sidenav {
		font-size: 14px;
	}

	.icon-sidenav {
		font-size: 20px;
	}
</style>
