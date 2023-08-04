import { writable } from 'svelte/store';

function createDialog() {
	const { subscribe, set } = writable<boolean>(false);

	return {
		subscribe,
		open: () => {
			set(true);
		},
		close: () => {
			set(false);
		}
	};
}

export const isDialogOpen = createDialog();
