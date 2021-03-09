export interface ClientOrganization {
	"id": number,
	"doingBusinessAs": string,
	"externalClientOrganizationId": string,
	"partyProperties": PartyProperty[]
}

export interface PartyProperty {
	"id": number,
	"group": string,
	"name": string,
	"value": string
}
