import {Permission} from "security/AuthenticationToken"

export interface ClientOrganization {
	id: number,
	doingBusinessAs: string,
	externalClientOrganizationId: string,
	partyProperties: PartyProperty[]
}

export interface PartyProperty {
	id: number,
	group: string,
	name: string,
	value: string
}

// this interface must match backend
export interface AuthenticationToken {
	token: string,
	issued: number,
	expires: number,
	permissions: Permission[]
}

export interface Transaction {
	id: number,
	createdDatetime: string,
	amount: number,
	paidBy: Person,
	transactions: Transaction[]
}

export interface Person {
	id: number,
	firstName: string,
	lastName: string,
	age: number,
	clientOrganizationReference: number,
	transactionHistory: Transaction[]
}
