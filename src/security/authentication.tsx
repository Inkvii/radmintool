const authenticationTokenName = "authenticationToken"

/**
 * Function loads authentication token from local storage and returns it
 */
export function loadAuthenticationToken() {
	console.group("loadAuthenticationToken")
	const token = localStorage.getItem(authenticationTokenName)
	if (token === undefined || token === null) {
		console.debug("Token is not set")
		return ""
	}
	console.debug("Authentication token found in local storage")
	const finalToken = JSON.parse(token) || ""
	console.groupEnd()
	return finalToken
}

/**
 * Function sets token to local storage as a json
 * @param token token to be stored
 */
export function setAuthenticationToken(token: string) {
	console.group("setAuthenticationToken")
	if (token === undefined || token === null || token === "") {
		console.debug("Removing authentication token")
		localStorage.removeItem(authenticationTokenName)
	} else {
		console.debug("Setting authentication token")
		localStorage.setItem(authenticationTokenName, JSON.stringify(token))
	}
	console.groupEnd()
}

/**
 * Returns true if token is valid and verified.
 * todo: will handle access rights as well
 * @param token
 */
export function isTokenValid(token?: string) {
	if (!token) {
		token = loadAuthenticationToken()
	}

	return token !== undefined && token !== null && token !== ""
}
