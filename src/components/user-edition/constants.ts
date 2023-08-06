export const FORM_MODES = {
	edit: 'edit',
	create: 'create'
};

export const FORM_CONTENT = {
	edit: {
		title: 'Edit the user',
		message: 'Edit the svelte store user'
	},
	create: {
		title: 'Create the user',
		message: 'Create a new svelte store user'
	}
};

export type FormMode = keyof typeof FORM_MODES;
