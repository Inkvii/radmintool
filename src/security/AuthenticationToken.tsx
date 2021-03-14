export enum Permission {
	REDUX_COUNTER,
	ADMIN_PAGE
}


export interface AuthenticationToken {
	token: string,
	issued: number,
	expires: number,
	permissions: Permission[]
}
