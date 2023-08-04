<script lang="ts">
	import { DataTable, Pagination } from 'carbon-components-svelte';
	import { dataRows } from '../data/data';

	const pageSizes = [5, 10, 15];
	let pageSize = pageSizes[0];
	let page = 2;

	$: firstItem = (page - 1) * pageSize;
	$: filteredItems = dataRows.slice(firstItem, firstItem + pageSize);
</script>

<DataTable
	sortable
	headers={[
		{ key: 'username', value: 'Username' },
		{ key: 'store', value: 'Store' },
		{ value: 'Actions', key: 'actions' }
	]}
	rows={filteredItems}
>
	<svelte:fragment slot="cell" let:row let:cell>
		{#if cell.key === 'actions'}
			<button class="table-button">Edit</button>
			<button class="table-button">Delete</button>
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>
<Pagination {pageSizes} bind:pageSize bind:page totalItems={dataRows.length} />

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
