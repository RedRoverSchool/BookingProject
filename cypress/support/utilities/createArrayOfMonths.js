const arrayOfConsetutiveMonths = () => {
	let consecutiveMonths = []
	let count = 0
	while (count <= 12) {
		const current = new Date()
		current.setMonth(current.getMonth() + count)
		current.setDate(1)
		const month = current.toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })
		consecutiveMonths.push(month)
		count++
	}
	return consecutiveMonths
}
export default arrayOfConsetutiveMonths
