<script>
	import { Button } from 'carbon-components-svelte';
	import Table from '../components/Table.svelte';
</script>

<svelte:head
	><link
		rel="stylesheet"
		href="https://unpkg.com/carbon-components-svelte@0.30.0/css/g10.css"
	/></svelte:head
>

<div class="table-box">
	<div class="table-header">
		<h1>User List</h1>
		<Button kind="secondary">Add new user</Button>
	</div>

	<Table />
</div>

<style lang="scss">
	.table-box {
		margin: 0 auto;
		padding: 5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 60vw;
	}
	.table-header {
		display: flex;
		justify-content: space-between;
	}
</style>
