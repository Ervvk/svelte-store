<script lang="ts">
	import { Select, SelectItem, TextInput, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { createUser, editUser } from '../api/users';
	import { stores } from '../stores/stores';
	import { users, selectedUser } from '../stores/users';
	import { isDialogOpen } from '../stores/dialog';
	import toast from 'svelte-french-toast';

	let errorMessage = '';
	$: formValues = $selectedUser;

	onMount(() => {
		stores.reload();
	});

	const validateUsername = (username: string) => username && username.length > 2;
	const validateStoreId = (store_id: number) => store_id;

	const displayToast = (status: number | null) => {
		if (status === 201) {
			toast.success('The user has been successfully added!');
		} else if (status === 204) {
			toast.success('The user has been successfully updated!');
		} else {
			toast.error('Failed to create a new user');
		}
	};

	const handleFormSubmit = async () => {
		if (!validateUsername(formValues.username) || !validateStoreId(formValues.store_id)) {
			errorMessage = 'Please fill in all required fields.';
			return;
		}

		let response = null;

		if ($selectedUser.id > 0) {
			response = await editUser({ ...formValues, id: $selectedUser.id });
			selectedUser.reset();
		} else {
			response = await createUser(formValues);
		}

		displayToast(response);
		isDialogOpen.close();
		users.reload();
	};
</script>

{#if $stores}
	<form on:submit|preventDefault={handleFormSubmit} class="form">
		<p>Create a new Svelte Store User.</p>
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
		<Button type="submit" class="form-button" kind="secondary" style="margin-top: 1rem;"
			>Submit</Button
		>
	</form>
{:else}
	<p>No stores data</p>
{/if}

<style lang="scss">
	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
