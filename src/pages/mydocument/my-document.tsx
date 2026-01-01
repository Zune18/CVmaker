import * as React from 'react';
import { useState } from 'react';
import { useDataModel } from '../../frontend/hooks/useDataModel';
import { apiEndPoints } from '../../backend/services/constants';
import { NavLink } from 'react-router-dom';
import BasePage from '../../frontend/components/Global/BasePage/base-page';
import styles from './my-document.module.scss';
import FullLoader from '../../frontend/components/Global/Loaders/full-loader';
import DocPreview from '../../frontend/components/resume/preview/doc-preview';
import {
	E_IntroPosition,
	E_SecondaryPanelPosition,
	I_DocConfig,
	I_DocSettings
} from '../../backend/services/resume/doc-config.interface';
import { ESectionsNames, ESectionTypes } from '../../frontend/components/resume/layouts/constants/config-constants';
import { editResumePath } from '../../frontend/components/Global/global-paths/global-paths';
import AppLink from '../../frontend/components/Global/AppLink/app-link';
import { Button } from '@mui/material';

function Mydocuments() {

	const [myResume, setMyResume] = useState<any[]>([]);

	const myDocumentAPI = useDataModel({
	  apiEndpoint: apiEndPoints.display,
	  method: 'post',
	  automatic: true,
	  payload: null,
	  onApiSuccess: (res) => {
			setMyResume(res.data.documents);
	  }
	});

	console.log({myResume});

	return (
		<BasePage>
			<div className={styles.title}>
				<div > DOCUMENTS
					 <hr />
				</div>
				{/* <div className={styles.CreatDocument}>
					<AppLink to={'/resume-templates'}><button>Create Document</button></AppLink>
				</div> */}
			</div>
			<div className={styles.resumeListContainer}>
				<div className={styles.resumeList}>
        			{myResume.map((item, i) => (
						<AppLink key={i}  to={`${editResumePath}/${item.id}`}>
							<div className={styles.resumeItem}>
								<DocPreview config={item.pagesWithData[0]} settings={item.docConfig} size={0.5} />
								<div className={styles.docDetails}>
									<div className={styles.hoverEffect}>
										Click To Edit
									</div>
									<div className={styles.info}>
										<header>
											{item.name}
										</header>
										<header>
											Modified at: {new Date(item.modified_at).toDateString()}
										</header>
									</div>
								</div>
							</div>
						</AppLink>
        			))}
      			</div>
			</div>
			<FullLoader isOpen={myDocumentAPI.isLoading} />
		</BasePage>
	);
}

export default Mydocuments;