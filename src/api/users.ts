import { supabase } from '$lib/supabaseClient';
import type { NewUser, UserDetails } from '../types';

export async function getUsers(): Promise<UserDetails[] | null> {
	try {
		const { data, error } = await supabase.from('users_details').select('*');
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
