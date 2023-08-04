<script lang="ts">
	import { onMount } from 'svelte';
	import { DataTable, Pagination } from 'carbon-components-svelte';
	import { users } from '../stores/users';

	const headers = [
		{ key: 'username', value: 'Username' },
		{ key: 'store_name', value: 'Store' },
		{ key: 'actions', value: 'Actions' }
	];

	const pageSizes = [5, 10, 15];
	let pageSize = pageSizes[0];
	let page = 1;

	onMount(async () => {
		users.reload();
	});
</script>

{#if $users}
	<DataTable sortable {headers} rows={$users} {pageSize} {page}>
		<svelte:fragment slot="cell" let:row let:cell>
			{#if cell.key === 'actions'}
				<button class="table-button">Edit</button>
				<button class="table-button">Delete</button>
			{:else}
				{cell.value}
			{/if}
		</svelte:fragment>
	</DataTable>
	<Pagination {pageSizes} bind:pageSize bind:page totalItems={$users.length} />
{:else}
	<p>No data</p>
{/if}

<style lang="scss">
	.table-button {
		border: none;
		background: transparent;
		cursor: pointer;
		&:hover {
			color: blue;
		}
	}
</style>
