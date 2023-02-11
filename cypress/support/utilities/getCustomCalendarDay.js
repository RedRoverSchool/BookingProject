const getCustomCalendarDay = (count) => {
    const date = new Date();
    date.setDate(date.getDate() + count);
	let customCalendarDay = date.toLocaleString('en-US', { day: 'numeric', timeZone: 'Asia/Bangkok' })
 
    return customCalendarDay
}

export default getCustomCalendarDay
