export default async function loadClientOrganizationList(delayRange: number = 1000, addedDelay: number = 1000) {

	const timeToWait: number = Math.random() * delayRange + addedDelay
	console.log("Will wait " + timeToWait)

	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

	await sleep(timeToWait)
	console.log("Waiting finished")
	return require("./clientOrgList.json")

}
