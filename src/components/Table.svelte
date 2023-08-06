<script lang="ts">
	import { onMount } from 'svelte';
	import { DataTable, Pagination } from 'carbon-components-svelte';
	import { selectedUser, users } from '../stores/users';
	import { isDialogOpen } from '../stores/dialog';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import type { User } from '../types';
	import Confirmation from './Confirmation.svelte';

	const headers = [
		{ key: 'username', value: 'Username' },
		{ key: 'store_name', value: 'Store' },
		{ key: 'actions', value: 'Actions' }
	];

	$: deleteConfirmationOpen = false;

	const pageSizes = [5, 10, 15];
	let pageSize = pageSizes[0];
	let currentPage = 1;

	onMount(async () => {
		users.reload();
	});

	const handleEditUser = (row: User) => {
		selectedUser.set(row);
		isDialogOpen.open();
	};

	const handleDeleteUser = async (row: User) => {
		selectedUser.set(row);
		deleteConfirmationOpen = true;
	};
</script>

{#if $users}
	<DataTable {headers} sortable rows={$users} {pageSize} page={currentPage}>
		<svelte:fragment slot="cell" let:row let:cell>
			{#if cell.key === 'actions'}
				{@const user = { id: row.id, username: row.username, store_id: row.store_id }}
				<button on:click={() => handleEditUser(user)} class="table-button"
					><Edit fill="blue" /></button
				>
				<button on:click={() => handleDeleteUser(user)} class="table-button"
					><TrashCan fill="red" /></button
				>
			{:else}
				{cell.value}
			{/if}
		</svelte:fragment>
	</DataTable>
	<Pagination {pageSizes} bind:pageSize bind:page={currentPage} totalItems={$users.length} />
	<Confirmation bind:isOpen={deleteConfirmationOpen} />
{:else}
	<p>Wait for data</p>
{/if}

<style lang="scss">
	.table-button {
		border: none;
		background: transparent;
		cursor: pointer;
		&:hover {
			color: rgb(8, 8, 252);
		}
	}
</style>
