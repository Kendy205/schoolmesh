<script>
	import SettingsMenuItem from './SettingsMenuItem.svelte';
</script>

<ul class="m-4">
	<SettingsMenuItem link="#my_profile"
		><span class="material-icons pr-2" slot="icon">account_circle</span>
		<p slot="text">My Profile</p>
	</SettingsMenuItem>
	<!-- Submenu -->
	<div class="ml-8">
		<SettingsMenuItem link="#header">
			<p slot="text">Header</p>
		</SettingsMenuItem>
		<SettingsMenuItem link="#profile_picture">
			<p slot="text">Profile Picture</p>
		</SettingsMenuItem>
		<SettingsMenuItem link="#display-name">
			<p slot="text">Name</p>
		</SettingsMenuItem>
		<SettingsMenuItem link="#caption">
			<p slot="text">Caption</p>
		</SettingsMenuItem>
		<SettingsMenuItem link="#social_sites">
			<p slot="text">Social Sites</p>
		</SettingsMenuItem>
	</div>
	<SettingsMenuItem link="#language_settings"
		><span class="material-icons pr-2" slot="icon"> translate </span>
		<p slot="text">Language Settings</p>
	</SettingsMenuItem>
</ul>

<style>
	* {
		scroll-behavior: smooth;
	}
</style>
