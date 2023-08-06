import toast from 'svelte-french-toast';
import { API_CODES } from '$lib/supabaseClient';

export const matchStatus = (status: number, code: number): boolean => status - code >= 0;

const HTTP_MESSAGES = {
	success: 'The operation was succesfull!',
	serverError: 'Operation failed, server error!',
	clientError: 'Operation failed, request error!'
};

export const displayToast = (status: number | null) => {
	if (!status) return;

	if (matchStatus(status, API_CODES.success)) {
		toast.success(HTTP_MESSAGES.success);
	}
	if (matchStatus(status, API_CODES.clientError)) {
		toast.error(HTTP_MESSAGES.success);
	}
	if (matchStatus(status, API_CODES.serverError)) {
		toast.error(HTTP_MESSAGES.serverError);
	}
};
