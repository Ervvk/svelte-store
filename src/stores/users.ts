import { writable } from 'svelte/store';
import type { User, UserDetails } from '../types';
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

function createSelectedUser() {
	const initialState = {
		id: 0,
		username: '',
		store_id: 1
	};

	const { subscribe, set } = writable<User>(initialState);
	return {
		subscribe,
		set: (user: User) => set(user),
		reset: () => set(initialState)
	};
}

export const users = createUsers();
export const selectedUser = createSelectedUser();
