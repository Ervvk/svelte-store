import { writable } from 'svelte/store';
import type { Store } from '../types';
import { getStores } from '../api/stores';

function createStores() {
	const { subscribe, set } = writable<Store[] | null>(null);

	return {
		subscribe,
		reload: async () => {
			const storesData = await getStores();
			set(storesData);
		},
		reset: () => set(null)
	};
}

export const stores = createStores();
