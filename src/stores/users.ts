import { writable } from 'svelte/store';
import type { User, UserDetails } from '../types';
import { getUsers } from '../api/users';
import { cloneObject } from '../utils';

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

export const defaultUser = {
	id: 0,
	username: '',
	store_id: 1
};

function createSelectedUser() {
	const getInitialState = () => cloneObject(defaultUser);

	const { subscribe, set } = writable<User>(getInitialState());
	return {
		subscribe,
		set: (user: User) => set(user),
		reset: () => {
			set(getInitialState());
		}
	};
}

export const users = createUsers();
export const selectedUser = createSelectedUser();
