// this enum must match backend
import axios from "axios"
import {AuthenticationToken} from "BackendObjects"

export enum Permission {
	REDUX_COUNTER,
	ADMIN_PAGE
}

/**
 * Class handling token issuing and verification. Communicates with backend when token expires or user requests new token
 * when login page form is issued
 */
export default class AuthenticationProvider {
	// name of the key that will be used for local storage
	public authenticationTokenName: string = "authenticationToken"
	// currently active authentication token (in memory)
	private authenticationToken: AuthenticationToken | null
	// switcher that prevents issues from forming when user logs out
	private isActive: boolean

	constructor() {
		this.authenticationToken = null
		this.isActive = true
	}

	/**
	 * Checks token validity. Token is valid if it is set to the class and expiration date is in the future
	 * Returns true if token is valid
	 * @private
	 */
	private static checkTokenValidity(token: AuthenticationToken | null): boolean {
		if (token?.expires) {
			console.log("Token will expire in: " + (token.expires - Date.now() / 1000) + " s")
		}

		return token !== undefined
			&& token !== null
			&& token.expires !== undefined
			&& token.expires > Date.now()
			&& token.issued !== undefined
			&& token.issued < Date.now()
	}

	public logout() {
		this.authenticationToken = null
		this.isActive = false
		localStorage.removeItem(this.authenticationTokenName)
	}

	/**
	 * Method returns valid authentication token or null.
	 * Uses fallback options as follows:
	 *  1) get token from memory
	 *  2) get token from local storage
	 *  3) issue new token on backend (this is saved to localstorage upon verification)
	 *  4) fail to retrieve token results in null
	 */
	public async getAuthenticationToken(): Promise<AuthenticationToken | null> {
		console.group("Debugging authentication token")
		console.debug("Token is active: " + this.isActive)
		console.debug("Token is set: " + this.authenticationToken?.token)
		console.debug("Token is valid: " + AuthenticationProvider.checkTokenValidity(this.authenticationToken))
		console.debug("Token expires on " + this.authenticationToken?.expires)
		console.groupEnd()

		if (!this.isActive) {
			return null
		}

		console.group("Get authentication token")
		console.time()
		if (AuthenticationProvider.checkTokenValidity(this.authenticationToken)) {
			console.debug("Current token in memory is still valid")
			console.timeEnd()
			console.groupEnd()
			return this.authenticationToken
		}

		const tokenFromStorage: AuthenticationToken | null = this.loadAuthenticationTokenFromStorage()
		if (AuthenticationProvider.checkTokenValidity(tokenFromStorage)) {
			this.authenticationToken = tokenFromStorage
			console.debug("Token was retrieved from local storage")
			console.timeEnd()
			console.groupEnd()
			return this.authenticationToken
		}

		const token = await this.requestTokenRenewal()
		return await this.checkBackendRenewedToken(token)

	}

	public async requestTokenRenewal(): Promise<AuthenticationToken | null> {
		if (this.authenticationToken == null) {
			return null
		}
		localStorage.removeItem(this.authenticationTokenName)
		console.debug("Requesting token renewal with data " + JSON.stringify(this.authenticationToken))
		return axios.post("http://localhost:8080/authentication/renewToken", JSON.stringify(this.authenticationToken), {headers: {"Content-Type": "application/json"}}).then(response => {
			console.debug("Returning response of renewal " + response.data)
			return response.data as AuthenticationToken
		})
	}

	public async requestNewTokenFromBackend(authentication: { username: string, password: string }) {
		return axios.post("http://localhost:8080/authentication/login", authentication)
			.then(res => {
				this.authenticationToken = res.data
				this.isActive = true
				localStorage.setItem(this.authenticationTokenName, JSON.stringify(this.authenticationToken))
				console.debug("Authentication is set to " + JSON.stringify(this.authenticationToken))
			})
			.catch(error => {
				console.error("Failed to retrieve login details from backend. " + error)
				this.authenticationToken = null
				this.isActive = false
			})
	}

	/**
	 * Checks that token received from backend, because previous token expired, is valid. If yes, saves it to local storage
	 * @param token
	 * @private
	 */
	private async checkBackendRenewedToken(token: AuthenticationToken | null): Promise<AuthenticationToken | null> {
		if (AuthenticationProvider.checkTokenValidity(token)) {
			this.authenticationToken = token
			localStorage.setItem(this.authenticationTokenName, JSON.stringify(token))
			console.debug("Token was renewed from backend")
			console.timeEnd()
			console.groupEnd()
			return token
		}
		this.authenticationToken = null
		return null
	}

	/**
	 * Tries to load existing authentication from storage. If that fails, returs null
	 * @private
	 */
	private loadAuthenticationTokenFromStorage(): AuthenticationToken | null {
		console.group("Load authentication token from storage")
		const tokenString = localStorage.getItem(this.authenticationTokenName)

		if (tokenString) {
			const token: AuthenticationToken = JSON.parse(tokenString)
			console.groupEnd()
			return token
		}
		console.groupEnd()
		return null
	}
}
