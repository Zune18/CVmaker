import React, {useState} from 'react';
import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { defaultStyles, TextStyle } from '../../default-stylesheet';
import {PdfUtils} from "../../helpers/utils";
import {I_DocSettings} from "../../../../../../backend/services/resume/doc-config.interface";

interface I_Section {
	settings: I_DocSettings;
    data: any;
}
const InterestsPdf = ({ settings, data }: I_Section) => {
	const [interestsData, setInterestsData] = useState<any[]>(data.interests);

	return (
		<View style={styles.container}>
			<View style={styles.aboutMe}>
				<Text style={{ ...styles.sectionHeading, marginBottom: '8px',
					width: PdfUtils.calculateStringLength('Interests'),
					fontSize: PdfUtils.getFontSize(1.4) }}>Interests
				</Text>
				<View style={{...styles.insideContainer, fontSize: PdfUtils.getFontSize(1)}}>
					{interestsData.map((interests: any, index) => (
						<Text key={index} style={styles.interests}>
							{interests.name}
						</Text>
					))}
				</View>
			</View>
		</View>
	);
};
export default InterestsPdf;

const styles = StyleSheet.create({
	container: {
		...defaultStyles.flexRow,
		alignItems: 'flex-start',
		padding: 10
	},
	aboutMe: {
		...defaultStyles.flexCol,
		flexGrow: 1
	},
	insideContainer: {
		...defaultStyles.flexRow,
		fontWeight: 400,
		width: '100%',
		display: 'flex',
		flexWrap: "wrap"
	},
	sectionHeading: {
	    ...TextStyle.default,
	    fontWeight: 500,
	    borderBottom: '1px solid var(--dark)'
	},
	interests: {
		...defaultStyles.flexRowCenter,
		marginRight: '8px',
		padding: '3px 10px',
		borderRadius: '6px',
		borderWidth: 1,
		borderColor: 'rgba(127, 127, 127)',
    	borderStyle: 'solid',
		marginTop: '5px'
	}
});
