import React, { useState } from "react";
import { Text, View, StyleSheet, Link} from '@react-pdf/renderer';
import { defaultStyles, TextStyle } from '../../default-stylesheet';
import { I_DocSettings } from '../../../../../../backend/services/resume/doc-config.interface';
import { PdfUtils } from '../../helpers/utils';
import {v4 as uuidv4} from "uuid";
import {convertDateToString} from "../../../../../common/svc-utils";

interface I_Section {
    settings: I_DocSettings;
    data: any;
}

const EducationPdf = ({ settings, data }: I_Section) => {
	const [educationData, setEducationData] = useState<any[]>(data.educations);

	return (
		<View style={styles.container}>
			<View style={styles.aboutMe}>
				<Text style={{ ...styles.sectionHeading, marginBottom: '8px',
					width: PdfUtils.calculateStringLength('Education'),
					fontSize: PdfUtils.getFontSize(1.4) }}>Education
				</Text>
				{educationData.map((educationDetails: any) => (
					<View key={uuidv4()}>
						<Text style={{...styles.title, fontSize: PdfUtils.getFontSize(1.4)}}>{educationDetails?.title}</Text>
						<View style={{...styles.schoolAndAdressContainer,  fontSize: PdfUtils.getFontSize(1.3)}}>
							<Text style={{...styles.schoolName, width: '50%', fontStyle: 'italic' }}>{educationDetails?.school_name}</Text>
						</View>
						<View style={{...styles.schoolAndAdressContainer,  fontSize: PdfUtils.getFontSize(1.3)}}>
							<Text style={{ fontSize: PdfUtils.getFontSize(1.1), fontWeight: 200 }}>{educationDetails?.address}</Text>
						</View>
						<View style={{...styles.insideContainer, fontSize: PdfUtils.getFontSize(1), fontStyle: 'italic', fontWeight: 500}}>
							<Text style={{ marginRight: '8px' }}>
								{convertDateToString(educationDetails.sdate)} -
							</Text>
							<Text>
								{convertDateToString(educationDetails.edate)}
							</Text>
						</View>
						<Text style={{...styles.insideContainer, fontSize: PdfUtils.getFontSize(1)}}>{educationDetails?.stream}</Text>
						<View style={{...styles.insideContainer, fontSize: PdfUtils.getFontSize(1)}}>
							<Text style={{ fontWeight: 300, marginRight: 4}}>
								{educationDetails?.score_label}
							</Text>
							<Text >{educationDetails?.score}</Text>
						</View>
					</View>
				))}
			</View>
		</View>
	);
};

export default EducationPdf;

const styles = StyleSheet.create({
	container: {
		...defaultStyles.flexRow,
		alignItems: "flex-start",
		padding: 10,
		width: '100%'
	},
	schoolAndAdressContainer: {
		marginRight: '32px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: "rgb(43, 66, 94)"
	},
	educationsDetailsContainer: {
		...defaultStyles.flexRow
	},
	insideContainer: {
		...TextStyle.default,
		display: 'flex',
		flexDirection: 'row',
		fontSize: 8,
		fontWeight: 400,
		color: "rgb(43, 66, 94)"
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
	schoolName: {
		...TextStyle.default,
		fontWeight: 500
	}
});