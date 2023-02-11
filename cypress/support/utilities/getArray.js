const getArray = ($el) => {
	const array = $el.toArray().map(el => el.innerText)
	return array
}

export default getArray