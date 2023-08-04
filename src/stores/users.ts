import { writable } from 'svelte/store';
import type { UserDetails } from '../types';
import { getUsers } from '../api/users';

function createUsers() {
	const { subscribe, set } = writable<UserDetails[] | null>(null);

	return {
		subscribe,
		reload: async () => {
			const usersData = await getUsers();
			set(usersData);
		},
		reset: () => set(null)
	};
}

export const users = createUsers();
