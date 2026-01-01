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

const ProjectsPdf = ({ settings, data }: I_Section) => {
	const [projectsData, setProjectsData] = useState<any[]>(data.projects);

	return (
		<View style={styles.container}>
			<View style={styles.aboutMe}>
				<Text style={{ ...styles.sectionHeading, marginBottom: '8px',
					width: PdfUtils.calculateStringLength('Projects'),
					fontSize: PdfUtils.getFontSize(1.4) }}>Projects
				</Text>
				{projectsData.map((projectsDetails: any) => (
					<View key={uuidv4()}>
						<Text style={{...styles.title, fontSize: PdfUtils.getFontSize(1.4)}}>{projectsDetails?.title}</Text>
						<Text style={{ ...styles.common, fontSize: PdfUtils.getFontSize(1.2) }}>{projectsDetails?.role}</Text>
						<View style={{...styles.insideContainer, fontSize: PdfUtils.getFontSize(1), color: 'rgb(43, 66, 94)',
							fontStyle: 'italic', fontWeight: 500}}>
							<Text style={{ marginRight: '8px' }}>
								{convertDateToString(projectsDetails.sdate)} -</Text>
							<Text>{convertDateToString(projectsDetails.edate)}</Text>
						</View>
						{projectsDetails.info.length > 0 && (
							<View style={styles.infoStyle}>
								{projectsDetails.info.map((infoItem: any, index: React.Key | null | undefined) => (
									<View key={index}>
										<Text style={{ ...styles.infoStyle, fontSize: PdfUtils.getFontSize(1.2) }}>&#x2022; {infoItem}</Text>
									</View>
								))}
							</View>
						)}
					</View>
				))}
			</View>
		</View>
	);
};

export default ProjectsPdf;

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
	projectsDetailsContainer: {
		...defaultStyles.flexRow
	},
	sectionHeading: {
	    ...TextStyle.default,
	    fontWeight: 500,
	    borderBottom: '1px solid var(--dark)'
	},
	insideContainer: {
		...TextStyle.default,
		display: 'flex',
		flexDirection: 'row',
		fontSize: 8,
		fontWeight: 400
	},
	common: {
		...TextStyle.default,
		fontWeight: 300,
		marginRight: 4
	},
	infoStyle: {
		...defaultStyles.flexCol,
		...TextStyle.default,
		fontWeight: 300,
		marginRight: 4
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