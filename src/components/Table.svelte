<script lang="ts">
	import { onMount } from 'svelte';
	import { DataTable, Pagination } from 'carbon-components-svelte';
	import { selectedUser, users } from '../stores/users';
	import type { DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import { isDialogOpen } from '../stores/dialog';

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

	const editUser = (row: any) => {
		isDialogOpen.open();
		selectedUser.set(row);
	};

	const deleteUser = (userID: number) => {};
</script>

{#if $users}
	<DataTable {headers} sortable rows={$users} {pageSize} {page}>
		<svelte:fragment slot="cell" let:row let:cell>
			{#if cell.key === 'actions'}
				<button on:click={() => editUser(row)} class="table-button">Edit</button>
				<button on:click={() => deleteUser(row.id)} class="table-button">Delete</button>
			{:else}
				{cell.value}
			{/if}
		</svelte:fragment>
	</DataTable>
	<Pagination {pageSizes} bind:pageSize bind:page totalItems={$users.length} />
{:else}
	<p>Wait for data</p>
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
