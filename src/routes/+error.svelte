<script>
	import { page } from '$app/stores';
</script>

<div class="error-card">
	<h1>Incorrect route</h1>
	<p>We don't have such a page, please <a href="./">go back to homepage</a></p>
	<p>Error code: {$page.status}</p>
</div>

<style>
	.error-card {
		font-family: sans-serif;
		background-color: rgb(240, 240, 240);
		padding: var(--space-m);
		height: 100vh;
	}
</style>
