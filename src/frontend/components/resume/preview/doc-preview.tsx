import React from 'react';
import { I_DocConfig, I_DocSettings } from '../../../../backend/services/resume/doc-config.interface';
import { CustomCssVariables } from '../../../../styles/css.interface';
import PdfViewer from '../pdfViewer/pdf-viewer';
import { PDFViewer } from '@react-pdf/renderer';
import styles from './doc-preview.module.scss'

interface I_DocPreview {
	size?: number;
	config: I_DocConfig;
	settings: I_DocSettings;
}

const DocPreview = (props: I_DocPreview) => (
	<div className={styles.container}>
		<PDFViewer className={styles.viewer} showToolbar={false} style={{height: '424.2px', width: '300px'}}>
			<PdfViewer config={{page_1: props.config}} settings={props.settings} intro={{}} docInfo={{}} docData={{page_1: props.config}} />
		</PDFViewer>
	</div>
)

export default DocPreview;