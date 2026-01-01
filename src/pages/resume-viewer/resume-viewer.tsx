import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PdfViewer from '../../frontend/components/resume/pdfViewer/pdf-viewer';
import { useSelector } from 'react-redux';
import { RootState } from '../../backend/redux/store';
import styles from './resume-viewer.module.scss';
import { LayoutContextProvider } from '../../frontend/contexts/layout-context';
import Layout from '../../frontend/components/resume/layouts/Layout/layout';
import { APP_PATHS } from '../../frontend/components/Global/global-paths/global-paths';

function ResumeViewer() {
	const config = useSelector((state: RootState) => state.doc_config.config);
	const pageWiseData = useSelector((state: RootState) => state.doc_data.pagewise_data);

	const intro = useSelector(
		(state: RootState) => state.doc_data.personal_information
	);
	const docSettings = useSelector(
		(state: RootState) => state.doc_config.settings
	);
	const documentInfo = useSelector(
		(state: RootState) => state.doc_config.documentInfo
	);

	// if (process.env.REACT_APP_NODE_ENV !== 'development') {
	// 	location.replace(APP_PATHS.HOME.path);
	// 	return null;
	// }

	return (
		<div className={styles.pageContainer}>
			<div className={styles.layoutContainer}>
				{Object.keys(config)?.map((item: any, index: number) => (
					<div key={index} className={styles.layoutWrapper}>
						<LayoutContextProvider pageNo={item}>
							<Layout pageNo={item} key={index} index={index} />
						</LayoutContextProvider>
					</div>
				))}
				<div className={styles.overLay} />
			</div>
			<PDFViewer showToolbar={true} style={{ width: '54vw' }}>
				<PdfViewer
					config={config}
					settings={docSettings}
					intro={intro}
					docInfo={documentInfo}
					docData={pageWiseData}
				/>
			</PDFViewer>
		</div>
	);
}

export default ResumeViewer;
