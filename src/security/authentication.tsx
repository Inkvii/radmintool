import AuthenticationProvider from "security/AuthenticationToken"


export const authenticationProvider: AuthenticationProvider = new AuthenticationProvider()

// const authenticationTokenName = "authenticationToken"
//
// /**
//  * Function loads authentication token from local storage and returns it
//  */
// export function loadAuthenticationToken(): AuthenticationToken | null {
// 	console.group("loadAuthenticationToken")
// 	const token = localStorage.getItem(authenticationTokenName)
// 	if (token === undefined || token === null) {
// 		console.debug("Token is not set")
// 		console.groupEnd()
// 		return null
// 	}
// 	console.debug("Authentication token found in local storage")
// 	const finalToken = JSON.parse(token) || ""
// 	console.groupEnd()
// 	return finalToken
// }
//
// /**
//  * Function sets token to local storage as a json
//  * @param token token to be stored
//  */
// export function setAuthenticationToken(token: AuthenticationToken | null) {
// 	console.group("setAuthenticationToken")
// 	if (token === undefined || token === null || token?.token === "") {
// 		console.debug("Removing authentication token")
// 		localStorage.removeItem(authenticationTokenName)
// 	} else {
// 		console.debug("Setting authentication token")
// 		localStorage.setItem(authenticationTokenName, JSON.stringify(token))
// 	}
// 	console.groupEnd()
// }
//
// /**
//  * Returns true if token is valid and verified.
//  * @param token?
//  */
// export function isTokenValid(token?: AuthenticationToken | null) {
// 	if (!token) {
// 		token = loadAuthenticationToken() || undefined
// 	}
//
// 	return token !== undefined && token !== null && token.token !== ""
// }



