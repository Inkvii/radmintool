
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

async function loadPartyProperties(delayRange: number = 1000, addedDelay: number = 1000) {
	return loadFile(require("./partyProperties.json"), delayRange, addedDelay)
}

export {
	loadPartyProperties,
	loadClientOrganizationList
}
