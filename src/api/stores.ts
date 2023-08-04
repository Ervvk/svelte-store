import { supabase } from '$lib/supabaseClient';

export async function getStores() {
	try {
		const { data, error } = await supabase.from('stores').select('*');
		if (error) {
			throw error;
		}
		return data;
	} catch (error) {
		console.error('Error fetching users:');
		return null;
	}
}
