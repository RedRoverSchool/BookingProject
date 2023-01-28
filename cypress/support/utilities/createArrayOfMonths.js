const arrayOfConsetutiveMonths = () => {
	let consecutiveMonths = []
	let count = 0
	while (count <= 12) {
		const current = new Date()
		current.setDate(1)
		current.setMonth(current.getMonth() + count)
		const month = current.toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })
		consecutiveMonths.push(month)
		count++
	}
	return consecutiveMonths
}
export default arrayOfConsetutiveMonths
