import React, { useState } from "react";
import { Text, View, StyleSheet, Link} from '@react-pdf/renderer';
import { defaultStyles, TextStyle } from '../../default-stylesheet';
import { I_DocSettings } from '../../../../../../backend/services/resume/doc-config.interface';
import { PdfUtils } from '../../helpers/utils';
import {v4 as uuidv4} from "uuid";

interface I_Section {
    settings: I_DocSettings;
    data: any;
}

const AchievementsPdf = ({ settings, data }: I_Section) => {
	const [achievementsData, setAchievementsData] = useState<any[]>(data.achievements);

	return (
		<View style={styles.container}>
			<View style={styles.aboutMe}>
				<Text style={{ ...styles.sectionHeading, marginBottom: '8px',
					width: PdfUtils.calculateStringLength('Achievements'),
					fontSize: PdfUtils.getFontSize(1.4) }}>Achievements
				</Text>
				{achievementsData.map((achievementsDetails: any) => (
					<View key={uuidv4()}>
						<Text style={{...styles.title, fontSize: PdfUtils.getFontSize(1.4)}}>{achievementsDetails?.title}</Text>
						<View style={{...styles.infoContainer,  fontSize: PdfUtils.getFontSize(1.2)}}>
							<Text style={{...styles.info, width: '50%' }}>
								&#x2022; {achievementsDetails?.info}
							</Text>
						</View>
					</View>
				))}
			</View>
		</View>
	);
};

export default AchievementsPdf;

const styles = StyleSheet.create({
	container: {
		...defaultStyles.flexRow,
		alignItems: "flex-start",
		padding: 10,
		width: '100%'
	},
	infoContainer: {
		marginRight: '32px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: "rgb(43, 66, 94)"
	},
	achievementsDetailsContainer: {
		...defaultStyles.flexRow
	},
	sectionHeading: {
	    ...TextStyle.default,
	    fontWeight: 500,
	    borderBottom: '1px solid var(--dark)'
	},
	aboutMe: {
		...defaultStyles.flexCol,
		flexGrow: 1
	},
	title: {
		...TextStyle.default,
		fontWeight: 600
	},
	info: {
		...TextStyle.default,
		fontWeight: 400
	}
});