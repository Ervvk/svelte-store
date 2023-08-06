import { z } from 'zod';
import { ZodError } from 'zod';

export const usernameValidator = z.string().min(4).max(24);

export const validateInput = (zodValidator: z.Schema, inputValue: string) => {
	const validationState = { error: false, message: '' };
	try {
		zodValidator.parse(inputValue);
		return validationState;
	} catch (error) {
		validationState.error = true;
		if (error instanceof ZodError) {
			validationState.message = getZodErrorMessage(error.message);
		}

		return validationState;
	}
};

export const getZodErrorMessage = (zodErrorMessage: string) => {
	const parsedZod = JSON.parse(zodErrorMessage) as ZodError[];
	return parsedZod[0].message;
};
