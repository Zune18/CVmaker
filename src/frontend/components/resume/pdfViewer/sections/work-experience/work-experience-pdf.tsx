import React, {useState} from 'react';
import {Text, View, StyleSheet, Link, Image} from '@react-pdf/renderer';
import { defaultStyles, TextStyle } from '../../default-stylesheet';
import {PdfUtils} from "../../helpers/utils";
import {I_DocSettings} from "../../../../../../backend/services/resume/doc-config.interface";
import {PdfIcons} from "../../pdf-icons";
import {v4 as uuidv4} from 'uuid'
import {convertDateToString} from "../../../../../common/svc-utils";

interface I_Section {
    settings: I_DocSettings;
    data: any;
}

const WorkExperiencePdf = ({ settings, data }: I_Section) => {
	const [workExpsData, setWorkExpsData] = useState<any[]>(data.work_exps);

	return (
		<View style={styles.container}>
			<View style={styles.aboutMe}>
				<Text style={{ ...styles.sectionHeading, marginBottom: '8px',
					width: PdfUtils.calculateStringLength('work Exp'),
					fontSize: PdfUtils.getFontSize(1.4) }}>work Exp
				</Text>
				{workExpsData.map((workDetails: any) => (
					<View key={uuidv4()} style={styles.workExperienceDetailsContainer}>
						<Image
							src={PdfIcons.dot}
							style={styles.socialIcons}/>
						<View>
							<Text style={{...styles.title, fontSize: PdfUtils.getFontSize(1.4)}}>{workDetails?.title}</Text>
							<View style={styles.workExperienceDetailsElementContainer}>
								<View style={{...styles.schoolAndAdressContainer, fontSize: PdfUtils.getFontSize(1.3)}}>
									<Text style={{...styles.schoolName, width: '50%', fontStyle: 'italic'}}>
										{workDetails?.company_name}
									</Text>
								</View>
								<View style={{...styles.insideContainer, fontSize: PdfUtils.getFontSize(1.2), fontStyle: 'italic', fontWeight: 500}}>
									<Text style={{marginRight: '8px'}}>{convertDateToString(workDetails.sdate)}</Text>
									<Text style={{marginRight: '8px'}}>- {convertDateToString(workDetails.edate)}</Text>
								</View>
								<Text style={{...styles.common, fontSize: PdfUtils.getFontSize(1.2)}}>{workDetails?.role}</Text>
								<Text style={{...styles.common, fontSize: PdfUtils.getFontSize(1.2)}}>{workDetails?.technologies_used}
								</Text>
								<Text style={{...styles.link, fontSize: PdfUtils.getFontSize(1.2)}}>{workDetails?.link}</Text>
								{workDetails.info.length > 0 && (
									<View style={styles.common}>
										{workDetails.info.map((infoItem: any, index: React.Key | null | undefined) => (
											<View key={index}>
												<Text style={{ ...styles.common, fontSize: PdfUtils.getFontSize(1.2) }}>&#x2022; {infoItem}</Text>
											</View>
										))}
									</View>
								)}
							</View>
						</View>
					</View>
				))}
			</View>
		</View>
	);
};

export default WorkExperiencePdf;

const styles = StyleSheet.create({
	container: {
		...defaultStyles.flexRow,
		alignItems: "flex-start",
		padding: 10
	},
	workExperienceDetailsContainer: {
		...defaultStyles.flexRow
	},
	workExperienceDetailsElementContainer: {
		...defaultStyles.flexCol,
		marginRight: '16px',
		padding: '8px 0',
		content: " ",
		borderLeft: "1px #6c757d solid",
		paddingLeft: '14px',
		marginLeft: '-14px'
	},
	sectionHeading: {
	    ...TextStyle.default,
	    fontWeight: 500,
	    borderBottom: '1px solid var(--dark)'
	},
	schoolAndAdressContainer: {
		marginRight: '32px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: "rgb(43, 66, 94)"
	},
	insideContainer: {
		...defaultStyles.flexRow,
		color: "rgb(43, 66, 94)"
	},
	link: {
		...TextStyle.default,
		color: "rgb(0, 0, 255)",
		fontWeight: 280
	},
	common: {
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
	socialIcons: {
		display: 'flex',
		width: 16,
		height: 16,
		padding: 2,
		marginRight: 5,
		borderRadius: 3,
		justifyContent: 'center',
		alignItems: 'center'
	},
	schoolName: {
		...TextStyle.default,
		fontWeight: 500
	}
});