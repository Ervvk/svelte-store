import { supabase } from '$lib/supabaseClient';
import type { UserDetails } from '../types';

export async function getUsers(): Promise<UserDetails[] | null> {
	try {
		const { data, error } = await supabase.from('users_details').select('*');
		if (error) {
			throw error;
		}
		console.log(data);
		return data;
	} catch (error) {
		console.error('Error fetching users:');
		return null;
	}
}
