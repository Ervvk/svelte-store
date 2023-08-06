import { supabase } from '$lib/supabaseClient';
import type { NewUser, UserDetails, User } from '../types';

export async function getUsers(): Promise<UserDetails[] | null> {
	try {
		const { data, error } = await supabase.from('users_details').select('*').order('id');
		if (error) {
			throw error;
		}
		return data;
	} catch (error) {
		console.error('Error fetching users:');
		return null;
	}
}

export async function createUser(user: NewUser) {
	try {
		const { status, error } = await supabase
			.from('users')
			.insert({ username: user.username, store_id: user.store_id });
		if (error) {
			throw error;
		}
		return status;
	} catch (error) {
		console.error('Error creating the user:');
		return null;
	}
}

export async function editUser(user: User) {
	try {
		const { status, error } = await supabase
			.from('users')
			.update({ username: user.username, store_id: user.store_id })
			.eq('id', user.id);

		if (error) {
			throw error;
		}
		return status;
	} catch (error) {
		console.error('Error creating the user:');
		return null;
	}
}

export async function deleteUser(userId: number) {
	try {
		const { status, error } = await supabase.from('users').delete().eq('id', userId);

		if (error) {
			throw error;
		}
		return status;
	} catch (error) {
		console.error('Error creating the user:');
		return null;
	}
}
