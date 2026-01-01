export default function convertToInputDateFormat(date: Date | string | any) {
	let dateObject: any = new Date(date ?? new Date());
	// eslint-disable-next-line no-self-compare
	if (dateObject.getDate() !== dateObject.getDate()) {
		dateObject = new Date();
	}
	const year = dateObject.getFullYear();
	// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
	let month = dateObject.getMonth() + 1;
	let day = dateObject.getDate();
	if (month < 10) {
		month = `0${month}`
	}
	if (day < 10) {
		day = `0${day}`
	}
	return `${year}-${month}-${day}`
}