export enum Permission {
	DASHBOARD,
	REDUX_COUNTER,
	PROFILE
}


export interface AuthenticationToken {
	token: string,
	issued: number,
	expires: number,
	permissions: Permission[]
}
