export const convertDateToString = (date: Date | string | any): string => {
	if (!(date instanceof Date) && (typeof date !== 'string' || isNaN(Date.parse(date)))) {
		return '';
	}
	return date instanceof Date ? date.toDateString() : new Date(date).toDateString();
};
export const toTitleCase = (strList: string): string => {
	if (!strList) {
		return ''
	}
	const list = strList.split(' ');
	const tempStr = [];
	const exceptionList = ['and', 'or', 'of', 'in', 'if', 'but'];

	for (const str of list) {
		if (!exceptionList.includes(str.toLowerCase())) {
			const tempString = str.replace(
				/\w\S*/g,
				function (txt) {
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				});
			tempStr.push(tempString);
		} else {
			tempStr.push(str.toLowerCase());
		}
	}
	return tempStr.join(' ');
};
