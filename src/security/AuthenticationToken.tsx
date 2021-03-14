export enum Permission {
	DASHBOARD,
	REDUX_COUNTER,
	PROFILE,
	ADMIN_PAGE
}


export interface AuthenticationToken {
	token: string,
	issued: number,
	expires: number,
	permissions: Permission[]
}
