// Randomness functions used for mocking up data, with a seed so we get the same results each time (useful for mockups)


export function getRandom() {
	return Math.random();
}

export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(getRandom() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function getRandomFromArray(array, min, max) {
	if (min == null) {
		min = 0;
	}
	if (max == null) {
		max = array.length;
	}
	return array[getRandomInt(min, max)]
}

export function getRandomSubarray(arr, size) {
	var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
	while (i-- > min) {
		index = Math.floor((i + 1) * getRandom());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(min);
}

export function doWeightedCoinFlip(successOdds) {
	return getRandom() < successOdds;
}

export function getRandomDateTime(maxDaysAgo) {
	const end = new Date();
	var start = new Date();
	start.setDate(start.getDate() - maxDaysAgo);
	return new Date(start.getTime() + getRandom() * (end.getTime() - start.getTime()));
}