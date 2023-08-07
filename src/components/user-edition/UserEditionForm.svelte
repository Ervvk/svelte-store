<script lang="ts">
	import { Select, SelectItem, TextInput, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { createUser, editUser } from '../../api/users';
	import { stores } from '../../stores/stores';
	import { users, selectedUser, defaultUser } from '../../stores/users';
	import { isDialogOpen } from '../../stores/dialog';
	import { FORM_CONTENT, FORM_MODES } from './constants';
	import type { FormMode } from './constants';
	import { usernameValidator, validateInput } from '../../utils/validation';
	import { displayToast } from '$lib/toast';
	import { cloneObject } from '../../utils';

	export let formMode = FORM_MODES.create;
	$: formMessage = FORM_CONTENT[formMode as FormMode].message;

	onMount(() => {
		stores.reload();
	});

	let formValues = cloneObject(defaultUser);

	const resetFormValues = () => {
		formValues = cloneObject(defaultUser);
	};

	let errorMessage = '';

	$: {
		if (!$isDialogOpen) errorMessage = '';
	}

	//the values ​​differ only if a row has been selected for editing, so we set the form values ​​to the edited user details
	$: {
		if (formValues.id !== $selectedUser.id) formValues = cloneObject($selectedUser);
	}

	//disable form submission if it was not filled/edited
	$: isFormUnedited =
		formValues.store_id === $selectedUser.store_id &&
		formValues.username === $selectedUser.username;

	const finishEdition = () => {
		isDialogOpen.close();
		resetFormValues();
		selectedUser.reset();
		users.reload();
	};

	const handleFormSubmit = async () => {
		if (!formValues.store_id) return;

		const usernameValidationResult = validateInput(usernameValidator, formValues.username);

		if (usernameValidationResult.error) {
			errorMessage = usernameValidationResult.message;
			return;
		}

		//apiResponse variable will receive the response code from supabase request and the toast notification will be displayed
		let apiResponse = null;

		if (formMode === FORM_MODES.edit) {
			apiResponse = await editUser({ ...formValues, id: $selectedUser.id });
		}
		if (formMode === FORM_MODES.create) {
			apiResponse = await createUser(formValues);
		}

		displayToast(apiResponse);
		finishEdition();
	};
</script>

{#if $stores}
	<form on:submit|preventDefault={handleFormSubmit} class="form">
		<p>{formMessage}</p>
		<TextInput
			id="username"
			name="username"
			labelText="Username"
			bind:value={formValues.username}
		/>
		<Select
			id="select"
			labelText="Select store"
			name="store_id"
			bind:selected={formValues.store_id}
		>
			{#each $stores as store (store.id)}
				<SelectItem value={store.id} text={store.name} />
			{/each}
		</Select>

		{#if errorMessage}
			<p style="color: red;">{errorMessage}</p>
		{/if}
		<Button
			disabled={isFormUnedited}
			type="submit"
			class="form-button"
			kind="secondary"
			style="margin-top: 1rem;">Submit</Button
		>
	</form>
{:else}
	<p>No stores data</p>
{/if}

<style lang="scss">
	.form {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
</style>
