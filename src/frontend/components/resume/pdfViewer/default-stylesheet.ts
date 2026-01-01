import { StyleSheet } from '@react-pdf/renderer';

export const defaultStyles = StyleSheet.create({
	flexCol: {
		display: 'flex',
		flexDirection: 'column'
		// border: '1px solid black'
	},
	flexRow: {
		display: 'flex',
		flexDirection: 'row'
		// border: '1px solid black'
	},
	flexRowCenter: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
});

const FontRegister = StyleSheet.create({
	poppins: {
		fontFamily: 'Poppins'
	}
})

export const TextStyle = StyleSheet.create({
	link: {
		...FontRegister.poppins,
		display: 'flex',
		color: 'blue',
		textDecoration: 'underline'
	},
	sm: {
		...FontRegister.poppins,
		fontSize: 10
	},
	default: {
		...FontRegister.poppins
	},
	semiLg: {
		...FontRegister.poppins,
		fontSize: 14
	},
	lg: {
		...FontRegister.poppins,
		fontSize: 18
	}
})

export const ImageStyle = StyleSheet.create({
	default: {
		display: 'flex',
		// flexDirection: 'column',
		width: 60,
		height: 60,
		borderRadius: 50
	}
})