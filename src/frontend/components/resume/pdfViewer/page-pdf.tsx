import React from 'react';
import { Page, StyleSheet, View } from '@react-pdf/renderer';
import AboutMePdf from './sections/about-me/about-me';
import { defaultStyles } from './default-stylesheet';
import { E_IntroPosition, E_SecondaryPanelPosition } from '../../../../backend/services/resume/doc-config.interface';
import { IPdfSectionDetail } from './pdf-config-constant';

const width = 600;
const height = 1.41 * width;
const styles = StyleSheet.create({
	page: {
		...defaultStyles.flexCol,
		width: `${width}px`,
		height: `${height}px`,
		backgroundColor: '#FFF',
		color: 'black',
		marginBottom: '40px'
	},
	mainContainer: {
		...defaultStyles.flexCol
	},
	topSection: {
		...defaultStyles.flexCol,
		color: 'black',
		flexGrow: 1
	},
	sectionContainer: {
		...defaultStyles.flexRow
	},
	leftSection: {
		...defaultStyles.flexCol,
		width: '40%'
		// border: '1px solid red',
	},
	rightSection: {
		...defaultStyles.flexCol,
		flexGrow: 1
		// border: '1px solid red',
	},
	link: {
		...defaultStyles.flexCol,
		color: 'blue',
		textDecoration: 'underline'
	},
	hidden: {
		display: 'none'
	}
});

interface I_PdfViewer {
	intro: any;
	index: number;
	config: any;
	settings: any;
	mainList: any[];
	secondaryList: any[];
	pageData: any;
}

const PagePdf = ({ config, secondaryList, mainList, settings, index, intro, pageData }: I_PdfViewer) => (
	<Page size='A4' style={styles.page} break={false}>
		<View style={styles.mainContainer}>
			{/* eslint-disable-next-line max-len */}
			{(settings.introPosition === E_IntroPosition.top && index === 0 ||(!config.isSecPanelVisible && settings.introPosition !== E_IntroPosition.main)) ? (
				<View style={styles.topSection}>
					<AboutMePdf data={intro} settings={settings} />
				</View>
			) : null}
			<View style={styles.sectionContainer}>
				{/* Secondary Panel */}
				{config.isSecPanelVisible && config.secPanelPos === E_SecondaryPanelPosition.left ? (
					<View style={styles.leftSection}>
						{secondaryList.map((item: IPdfSectionDetail, index: number) => item.element({settings, data: pageData}))}
					</View>
				) : null}
				<View style={styles.rightSection}>
					{mainList.map((item: IPdfSectionDetail, index: number) => item.element({settings, data: pageData}))}
				</View>
				{/* Secondary Panel */}
				{config.isSecPanelVisible && config.secPanelPos === E_SecondaryPanelPosition.right ? (
					<View style={styles.leftSection}>
						{secondaryList.map((item: IPdfSectionDetail, index: number) => item.element({settings, data: pageData}))}
					</View>
				) : null}
			</View>
		</View>
	</Page>
);

export default PagePdf;