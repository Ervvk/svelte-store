<script>
	import { Modal } from 'carbon-components-svelte';
	import { isDialogOpen } from '../stores/dialog';
	import UserEditionForm from './UserEditionForm.svelte';
	import { selectedUser } from '../stores/users';

	const handleDialogClose = () => {
		isDialogOpen.close();
		selectedUser.reset();
	};
</script>

<Modal
	passiveModal
	open={$isDialogOpen}
	modalHeading="Create user"
	selectorPrimaryFocus="#db-name"
	on:open
	on:close={handleDialogClose}
>
	<UserEditionForm />
</Modal>
