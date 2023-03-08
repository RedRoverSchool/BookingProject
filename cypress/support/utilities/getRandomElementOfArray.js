const getRandomElementOfArray = ($el) => {
	const array = $el.toArray().map(el => el.innerText)
    let index = Math.floor(Math.random() * array.length)
    let randomElementOfArray = array[index]
	return randomElementOfArray
}

export default getRandomElementOfArray;