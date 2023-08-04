<script>
	import { Modal } from 'carbon-components-svelte';
	import { isDialogOpen } from '../stores/dialog';
	import UserEditionForm from './UserEditionForm.svelte';
</script>

<Modal
	passiveModal
	open={$isDialogOpen}
	modalHeading="Create user"
	selectorPrimaryFocus="#db-name"
	on:click:button--secondary={() => isDialogOpen.close()}
	on:open
	on:close={() => isDialogOpen.close()}
>
	<UserEditionForm />
</Modal>
