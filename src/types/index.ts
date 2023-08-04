export interface BaseEntity {
	id: number;
}

export interface User extends BaseEntity {
	username: string;
	store_id: number;
}

export interface UserDetails extends User {
	store_name: string;
}

export interface Store extends BaseEntity {
	name: string;
}
