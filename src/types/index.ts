export interface BaseEntity {
	id: number;
}

export interface NewUser {
	username: string;
	store_id: number;
}

export interface User extends BaseEntity, NewUser {}

export interface UserDetails extends User {
	store_name: string;
}

export interface Store extends BaseEntity {
	name: string;
}
