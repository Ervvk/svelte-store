<script>
	import { Modal, Button } from 'carbon-components-svelte';
	import { selectedUser, users } from '../stores/users';
	import { deleteUser } from '../api/users';
	import { displayToast } from '$lib/toast';

	export let isOpen = false;

	const resetDeletion = () => {
		selectedUser.reset();
		isOpen = false;
	};

	const handleCancel = () => {
		resetDeletion();
	};

	const handleConfirm = async () => {
		const status = await deleteUser($selectedUser.id);
		displayToast(status);
		resetDeletion();
		await users.reload();
	};
</script>

<Modal
	passiveModal
	open={isOpen}
	modalHeading="Create user"
	selectorPrimaryFocus="#db-name"
	on:open
	on:close={handleCancel}
>
	<p>Are you sure you want to delete this item?</p>
	<div class="actions-wrapper">
		<Button kind="secondary" on:click={handleCancel}>Cancel</Button>
		<Button kind="secondary" on:click={handleConfirm}>OK</Button>
	</div>
</Modal>

<style lang="scss">
	.actions-wrapper {
		margin-top: var(--space-s);
	}
</style>
