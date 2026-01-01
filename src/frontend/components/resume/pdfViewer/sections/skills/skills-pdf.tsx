import React, {useState} from 'react';
import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { defaultStyles, TextStyle } from '../../default-stylesheet';
import {PdfUtils} from "../../helpers/utils";
import {I_DocSettings} from "../../../../../../backend/services/resume/doc-config.interface";

interface I_Section {
	settings: I_DocSettings;
    data: any;
}
const SkillsPdf = ({ settings, data }: I_Section) => {
	const [skillsData, setSkillsData] = useState<any[]>(data.skills);

	return (
		<View style={styles.container}>
			<View style={styles.aboutMe}>
				<Text style={{ ...styles.sectionHeading, marginBottom: '8px',
					width: PdfUtils.calculateStringLength('Skills'),
					fontSize: PdfUtils.getFontSize(1.4) }}>Skills
				</Text>
				<View style={{...styles.insideContainer, fontSize: PdfUtils.getFontSize(1)}}>
					{skillsData.map((skill: any, index: React.Key | null | undefined) => (
						<View key={index}>
							<Text style={{ ...styles.skills, fontSize: PdfUtils.getFontSize(1.2) }}>{skill.name}</Text>
						</View>
					))}
				</View>
			</View>
		</View>
	);
};
export default SkillsPdf;

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
	skills: {
		...TextStyle.default,
		backgroundColor: 'rgb(0, 10, 63)',
		color: 'white',
		marginRight: '8px',
		padding: "3px 10px",
		borderRadius: '6px',
		marginTop: '5px'
	}
});
