const authenticationTokenName = "authenticationToken"

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

