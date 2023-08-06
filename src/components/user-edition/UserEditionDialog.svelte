<script lang="ts">
	import { Modal } from 'carbon-components-svelte';
	import { isDialogOpen } from '../../stores/dialog';
	import { selectedUser } from '../../stores/users';
	import UserEditionForm from './UserEditionForm.svelte';
	import { FORM_CONTENT, FORM_MODES } from './constants';
	import type { FormMode } from './constants';

	const handleDialogClose = () => {
		isDialogOpen.close();
		selectedUser.reset();
	};

	$: formMode = $selectedUser.id > 0 ? FORM_MODES.edit : FORM_MODES.create;
	$: dialogTitle = FORM_CONTENT[formMode as FormMode].title;
</script>

<Modal
	passiveModal
	open={$isDialogOpen}
	modalHeading={dialogTitle}
	on:open
	on:close={handleDialogClose}
>
	<UserEditionForm {formMode} />
</Modal>
