<script lang="ts">
	import { Select, SelectItem, TextInput, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { createUser } from '../api/users';
	import { stores } from '../stores/stores';
	import { users } from '../stores/users';
	import { isDialogOpen } from '../stores/dialog';
	import toast from 'svelte-french-toast';

	export let formInitialData = {
		username: '',
		store_id: 1
	};

	let errorMessage = '';

	let formValues = formInitialData;

	onMount(() => {
		stores.reload();
	});

	const validateUsername = (username: string) => username && username.length > 2;
	const validateStoreId = (store_id: number) => store_id;

	const displayToast = (status: number | null) => {
		if (status === 201) {
			toast.success('The user has been successfully added!');
		} else {
			toast.error('Failed to create a new user');
		}
	};

	const handleFormSubmit = async (x: Event) => {
		x.preventDefault();

		if (!validateUsername(formValues.username) || !validateStoreId(formValues.store_id)) {
			errorMessage = 'Please fill in all required fields.';
			return;
		}

		const responseStatus = await createUser(formValues);
		displayToast(responseStatus);

		isDialogOpen.close();
		users.reload();
	};
</script>

{#if $stores}
	<form on:submit={(x) => handleFormSubmit(x)} class="form">
		<p>Create a new Svelte Store User.</p>
		<br />

		<TextInput
			id="username"
			name="username"
			labelText="Username"
			placeholder="Enter username..."
			bind:value={formValues.username}
		/>
		<Select
			id="select-1"
			labelText="Select menu"
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
		<Button type="submit" class="form-button">Submit</Button>
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
