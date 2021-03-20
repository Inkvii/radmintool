/**
 * Method loads file (as a require("path/to/file")) with random delay as a simulation of backend processing
 * @param callback requires("path/to/file")
 * @param delayRange random delay range
 * @param addedDelay delay added to the random delay
 */
async function loadFile(callback: any, delayRange: number, addedDelay: number) {
	const timeToWait: number = Math.random() * delayRange + addedDelay
	console.group("Will wait " + timeToWait)
	console.time()

	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

	await sleep(timeToWait)
	console.timeEnd()
	console.groupEnd()
	return callback
}

async function loadClientOrganizationList(delayRange: number = 1000, addedDelay: number = 1000) {
	return loadFile(require("./clientOrgList.json"), delayRange, addedDelay)
}


export {
	loadClientOrganizationList
}
