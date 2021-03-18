// this enum must match backend
import axios from "axios"

export enum Permission {
	REDUX_COUNTER,
	ADMIN_PAGE
}

// this interface must match backend
export interface AuthenticationToken {
	token: string,
	issued: number,
	expires: number,
	permissions: Permission[]
}

export type RequestTokenCallback = () => Promise<AuthenticationToken | null>

export default class AuthenticationProvider {
	public authenticationTokenName: string = "authenticationToken"
	private authenticationToken: AuthenticationToken | null
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
		return token !== undefined
			&& token !== null
			&& token.expires > Date.now()
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
		console.groupEnd()

		if (!this.isActive) {
			return null
		}

		console.group("Get authentication token")
		console.time()
		if (AuthenticationProvider.checkTokenValidity(this.authenticationToken)) {
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

		const tokenFromBackend: AuthenticationToken | null = await this.requestTokenRenewal()
		if (AuthenticationProvider.checkTokenValidity(tokenFromBackend)) {
			this.authenticationToken = tokenFromBackend
			localStorage.setItem(this.authenticationTokenName, JSON.stringify(tokenFromBackend))
			console.debug("Token was renewed from backend")
			console.timeEnd()
			console.groupEnd()
			return this.authenticationToken
		}

		// setting null in case no fallback is valid
		this.authenticationToken = null
		console.debug("Token is set to null")
		console.timeEnd()
		console.groupEnd()
		return this.authenticationToken
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

	public async requestTokenRenewal(): Promise<AuthenticationToken | null> {
		if (this.authenticationToken == null) {
			return null
		}
		console.debug("Requesting token renewal with data " + JSON.stringify(this.authenticationToken))
		return await axios.post("http://localhost:8080/authentication/renewToken", JSON.stringify(this.authenticationToken)) as AuthenticationToken | null
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
