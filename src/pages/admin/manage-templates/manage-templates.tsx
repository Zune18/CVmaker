import React, { useState } from 'react';
import BasePage from '../../../frontend/components/Global/BasePage/base-page';
import styles from './manage-templates.module.scss';
import AppLink from '../../../frontend/components/Global/AppLink/app-link';
import AdminBasePage from '../admin-base-page';
import { useDataModel } from '../../../frontend/hooks/useDataModel';
import { apiEndPoints } from '../../../backend/services/constants';
import { editResumePath } from '../../../frontend/components/Global/global-paths/global-paths';
import DocPreview from '../../../frontend/components/resume/preview/doc-preview';
import Switch from '@mui/material/Switch';
import AppConfirmationDialog from '../../../frontend/components/Global/app-confirmation/app-confirmation-dialog';
import axios from 'axios';

function ManageTemplates() {
	const [templates, setTemplates] = useState<any>([]);

	const getTemplatesAPI = useDataModel({
		apiEndpoint: apiEndPoints.get_manage_template,
		automatic: true,
		onApiSuccess: (res) => {
			setTemplates(res.data.templates);
		}
	});

	const modifyTemplateApi = useDataModel({
		apiEndpoint: apiEndPoints.modify_template_visibility,
		onApiSuccess: (res) => {
			// console.log(templates, res.data.template);
		}
	});

	function confirmTemplateStatusChange(selectedTemplate: any) {
		console.log(selectedTemplate);
		modifyTemplateApi.controllers.setRequestPayload({
			documentId: selectedTemplate.id,
			isTemplate: selectedTemplate.isTemplate ?? false,
			showAsTemplate: selectedTemplate.showAsTemplate
		});
	}

	return (
		<BasePage>
			<AdminBasePage>
				<div className={styles.title}>
					<div>
						{' '}
                        MANAGE TEMPLATES
						<hr />
					</div>
					<div className={styles.CreatDocument}>
						<AppLink to={'/resume-templates'}>
							<button>Create Template</button>
						</AppLink>
					</div>
				</div>
				<div className={styles.templateListContainer}>
					<div className={styles.templateList}>
						{templates.map((item: any, i: number) => (
							<div
								className={styles.templateItemContainer}
								key={`${i}-${Math.random()}`}
							>
								<AppLink
									key={i}
									to={`${editResumePath}/${item.id}`}
								>
									<div className={styles.resumeItem}>
										<DocPreview
											config={item.pagesWithData[0]}
											settings={item.docConfig}
											size={0.5}
										/>
										<div className={styles.docDetails}>
											<div className={styles.hoverEffect}>
                                                Click To Edit
											</div>
											<div className={styles.info}>
												<header>{item.name}</header>
												<header>
                                                    Modified at:{' '}
													{new Date(
														item.modified_at
													).toDateString()}
												</header>
											</div>
										</div>
									</div>
								</AppLink>
								<div className={styles.templateSettings}>
									<header>Template Settings</header>
									<header>
										<div className={styles.flexRow}>
											<AppConfirmationDialog
												theme={'default'}
												confirmLabel={'Yes'}
												message={'Are you sure?'}
												onClick={() => {}}
												onConfirm={() => {
													confirmTemplateStatusChange(
														{
															...item,
															isTemplate:
                                                                !item.isTemplate
														}
													);
												}}
												onCancel={() => {}}
											>
												<Switch
													checked={item.isTemplate}
												/>
											</AppConfirmationDialog>
											<header>
                                                Document is template
											</header>
										</div>
										<div className={styles.flexRow}>
											<AppConfirmationDialog
												onClick={() => {}}
												onConfirm={() => {
													confirmTemplateStatusChange(
														{
															...item,
															showAsTemplate:
                                                                !item.showAsTemplate
														}
													);
												}}
											>
												<Switch
													checked={
														item.showAsTemplate
													}
												/>
											</AppConfirmationDialog>
											<header>Show as Template</header>
										</div>
									</header>
								</div>
							</div>
						))}
					</div>
				</div>
			</AdminBasePage>
		</BasePage>
	);
}

export default ManageTemplates;
