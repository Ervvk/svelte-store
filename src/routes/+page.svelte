<script>
	import { Button } from 'carbon-components-svelte';
	import Table from '../components/Table.svelte';
	import UserEditionDialog from '../components/user-edition/UserEditionDialog.svelte';
	import { isDialogOpen } from '../stores/dialog';
	import { Toaster } from 'svelte-french-toast';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
</script>

<svelte:head
	><link
		rel="stylesheet"
		href="https://unpkg.com/carbon-components-svelte@0.30.0/css/g10.css"
	/></svelte:head
>

<div class="table-wrapper">
	<div class="table-header">
		<h1>User List</h1>
		<Button on:click={() => isDialogOpen.open()} kind="secondary" icon={Add}>Add new user</Button>
	</div>
	<Table />
</div>
<UserEditionDialog />
<Toaster />

<style lang="scss">
	.table-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin: 0 auto;
		padding: var(--space-xl);
		max-width: 90rem;
	}
	.table-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	h1 {
		font-size: 2rem;
	}
</style>
