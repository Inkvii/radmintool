export default async function loadClientOrganizationList() {

	const timeToWait: number = Math.random() * 1000 + 1000
	console.log("Will wait " + timeToWait)

	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

	await sleep(timeToWait)
	console.log("Waiting finished")
	return require("./clientOrgList.json")

}
