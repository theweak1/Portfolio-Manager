function titleCase(str) {
	if (!str) {
		return '';
	}

	return str
		.toLowerCase()
		.split(' ')
		.map(function (word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(' ');
}

function isValidUUID(str) {
	const regexExp = /^[0-9a-fA-F]{24}$/gi;
	return regexExp.test(str);
}

function excludeFields(record, keys) {
	for (let key of keys) {
		delete record[key];
	}
	return record;
}

export { titleCase, isValidUUID, excludeFields };
