import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LayoutBlock from '../../layouts/layout-block/layout-block';
import AddIcon from '@mui/icons-material/Add';
import styles from './projects.module.scss';
import TextField from '@mui/material/TextField';
import MuiModal from '../../../Global/mui-modal/mui-modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import ResumeSectionAddIcon from '../../../shared/resume/sections/addIcon';
import EditAndDeleteIconsContainer from '../../../shared/resume/sections/editAndDeleteIconsContainer';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../backend/redux/store";
import {useLayoutContext} from "../../../../contexts/layout-context";
import lo from "lodash";
import {ASetProjects, ASetWorkExps} from "../../../../../backend/redux/reducers/document-data-reducer";
import {convertDateToString} from "../../../../common/svc-utils";
import convertToInputDateFormat from "../../../../common/convertToInputDateFormat";

class ProjectsData {
	title: string = '';
	sdate: Date = new Date();
	edate: Date = new Date();
	role: string = '';
	info: string[] = [];
}

const Projects: any = (props: any) => {
	const settings = useSelector((state: RootState) => state.doc_config.settings);
	// layout context
	const { pageNo, pageInfo } = useLayoutContext();
	const projectsDetails = useSelector((state: RootState) => state.doc_data.pagewise_data[pageNo] ?
		state.doc_data.pagewise_data[pageNo]?.projects : []) || [];
	// redux hooks
	const dispatch = useDispatch();

	const [modelData, setModelData] = useState<ProjectsData>(new ProjectsData());
	const [open, setOpen] = useState(false);
	const [openTextArea, setOpenTextArea] = useState(false);
	const [secondModalOpen, setSecondModalOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [inputItems, setInputItems] = useState<string[]>([]);
	const [inputValue, setInputValue] = useState('');
	function setprojectsDetails(existingData: any, newItem?: any) {
		const updatedData = lo.cloneDeep(existingData);
		if (newItem) {
			updatedData.push(newItem)
		}
		dispatch(ASetProjects({ pageNo, projects: [...updatedData] }));
	}

	const handleToggleTextArea = () => {
		setOpenTextArea(!openTextArea);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	function handleClose() {
		setOpen(false);
		setSecondModalOpen(false);
	}

	const handleAddItem = () => {
		const newItem: ProjectsData = {
			...modelData,
			info: [...inputItems]
		};
		setprojectsDetails(projectsDetails, newItem);
		setOpen(false);
	};

	const handleUpdateModalOpen = (index: number) => {
		setModelData(projectsDetails[index]);
		setSelectedIndex(index);
		setSecondModalOpen(true);
		setInputItems(projectsDetails[index].info);
	};
	const handleRemoveItem = (index: number) => {
		const updatedItems = [...projectsDetails];
		updatedItems.splice(index, 1);
		setprojectsDetails(updatedItems);
		setSecondModalOpen(false);
	};

	const handleUpdateItem = () => {
		if (modelData && selectedIndex !== null) {
			const updatedprojectsDetails = [...projectsDetails];
			updatedprojectsDetails[selectedIndex] = {
				...modelData,
				info: [...inputItems] // Update the info array with the new inputItems
			};
			setprojectsDetails(updatedprojectsDetails);
			setSecondModalOpen(false);
		}
	};
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};
	const handleAddInfoItem = () => {
		if (inputValue.trim() !== '') {
			setInputItems([...inputItems, inputValue.trim()]);
			setInputValue('');
		}
	};

	const handleRemoveInfoItem = (index: number) => {
		const updatedInputItems = [...inputItems];
		updatedInputItems.splice(index, 1);
		setInputItems(updatedInputItems);
	};

	return (
		<LayoutBlock key={props.id} {...props}>
			<div className={styles.container}>
				{projectsDetails.map((item: any, index: number) => (
					<div key={item.title} className={styles.projectsDetailsList}>
						<div className={styles.projectsDetailsElement}>
							<div className={styles.projectsDetailsElementTitle}>{item.title}</div>
							<div className={styles.projectsDetailsElement}>{item.role}</div>
							<div className={styles.projectsDates}>
								<div className={styles.projectsDates}>
									{convertDateToString(item.sdate)} -
								</div>
								<div className={styles.projectsDates}>
									{convertDateToString(item.edate)}
								</div>
							</div>
							<div className={styles.projectsInfoContainer}>
								<div className={styles.workExperienceDetailsElementInfo}>
									{item.info.map((infoItem: any, infoIndex: number) => (
										<div key={infoIndex}> &#x2022; {infoItem}</div>
									))}
								</div>
							</div>
						</div>
						{/* TODO: convert it into a shared toolbar component	 */}
						<div className={styles.editAndDeleteIconsContainer}>
							<EditAndDeleteIconsContainer
								itemDetails={projectsDetails}
								onDelete={() => {
									handleRemoveItem(index);
								}}
								onEdit={() => {
									handleUpdateModalOpen(index);
								}}
							/>
						</div>
					</div>
				))}

				<div className={styles.addButtonContainer}>
					<ResumeSectionAddIcon onClick={handleOpen} />
				</div>

				{/* add modal  */}
				<MuiModal open={open} setOpen={setOpen}>
					<div className={styles.modalContainer}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
						>
							<div className={styles.inputContainer}>
								<div className={styles.modaltitle}>
                                    Fill up projects Details
								</div>
								<div className={styles.submitButton}>
									<Button
										variant="outlined"
										size={'small'}
										className={styles.exitButton}
										onClick={handleClose}
									>
                                        Cancel
									</Button>
									<Button
										variant="contained"
										size={'small'}
										onClick={handleAddItem}
									>
                                        Save
									</Button>
								</div>
								<div className={styles.inputContainer}>
									<div className={styles.inputRow}>
										<TextField
											className={styles.inputBox}
											type="text"
											label="Title"
											variant="standard"
											placeholder="Title"
											onChange={(event) => {
												setModelData({
													...modelData,
													title: event.target.value
												});
											}}
										/>
										<TextField
											className={styles.inputBox}
											type="text"
											label="role"
											variant="standard"
											placeholder="role"
											onChange={(event) => {
												setModelData({
													...modelData,
													role: event.target.value
												});
											}}
										/>
									</div>
									<div className={styles.inputRow}>
										<TextField
											className={styles.inputBox}
											type="date"
											onChange={(event) => {
												setModelData({
													...modelData,
													sdate: new Date(
														event.target.value
													)
												});
											}}
										/>
										<TextField
											className={styles.inputBox}
											type="date"
											onChange={(event) => {
												setModelData({
													...modelData,
													edate: new Date(
														event.target.value
													)
												});
											}}
										/>
									</div>
									<div className={styles.infoListArea}>
										<div className={styles.infoContainer}>
											<div className={styles.inputInfoAndAddButtonContainer}>
												<TextField
													className={styles.info}
													type='text'
													label='Info'
													variant='standard'
													placeholder='Info'
													value={inputValue}
													onChange={handleInputChange}
												/>
												<Button
													variant='contained'
													size={'small'}
													className={styles.addButton}
													onClick={handleAddInfoItem}
												>ADD
												</Button>
											</div>
											<div className={styles.allWorkExperienceContainer}>
												{inputItems.map((item, index) => (
													<li key={index} className={styles.workContainer}>
														<div className={styles.work}>{item}</div>
														<button
															className={styles.removeButton}
															onClick={() => {
																handleRemoveInfoItem(index);
															}}
														>
															<ClearIcon className={styles.removeIcon} />
														</button>
													</li>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</Typography>
					</div>
				</MuiModal>

				{/* TODO[reuse code]: ues add modal in edit mode */}
				{/* edit modal  */}
				<MuiModal open={secondModalOpen} setOpen={setSecondModalOpen}>
					<div className={styles.modalContainer}>
						<Typography id="modal-modal-title">
							<div className={styles.modaltitle}>
                                Update projects Details
							</div>
							<div className={styles.submitButton}>
								<Button
									variant="outlined"
									size={'small'}
									className={styles.exitButton}
									onClick={handleClose}
								>
                                    Cancel
								</Button>
								<Button
									variant="contained"
									size={'small'}
									onClick={handleUpdateItem}
								>
                                    Update
								</Button>
							</div>
							<div className={styles.inputContainer}>
								<div className={styles.inputRow}>
									<TextField
										className={styles.inputBox}
										label="Title"
										type="text"
										variant="standard"
										value={modelData.title}
										onChange={(event) => {
											setModelData({
												...modelData,
												title: event.target.value
											});
										}}
									/>
									<TextField
										className={styles.inputBox}
										type="text"
										label="role"
										variant="standard"
										value={modelData.role}
										onChange={(event) => {
											setModelData({
												...modelData,
												role: event.target.value
											});
										}}
									/>
								</div>
								<div className={styles.inputRow}>
									<TextField
										className={styles.inputBox}
										type="date"
										value={convertToInputDateFormat(modelData.sdate)}
										onChange={(event) => {
											setModelData({
												...modelData,
												sdate: new Date(
													event.target.value
												)
											});
										}}
									/>
									<TextField
										className={styles.inputBox}
										type="date"
										value={convertToInputDateFormat(modelData.edate)}
										onChange={(event) => {
											setModelData({
												...modelData,
												edate: new Date(
													event.target.value
												)
											});
										}}
									/>
								</div>
								<div className={styles.infoListArea}>
									<div className={styles.infoContainer}>
										<div className={styles.inputInfoAndAddButtonContainer}>
											<TextField
												className={styles.info}
												type='text'
												label='Info'
												variant='standard'
												placeholder='Info'
												value={inputValue}
												onChange={handleInputChange}
											/>
											<Button
												variant='contained'
												size={'small'}
												className={styles.addButton}
												onClick={handleAddInfoItem}
											>
												ADD
											</Button>
										</div>
										<div className={styles.allWorkExperienceContainer}>
											{inputItems.map((item, index) => (
												<li key={index} className={styles.workContainer}>
													<div className={styles.work}>{item}</div>
													<button
														className={styles.removeButton}
														onClick={() => {
															handleRemoveInfoItem(index);
														}}
													>
														<ClearIcon className={styles.removeIcon} />
													</button>
												</li>
											))}
										</div>
									</div>
								</div>
							</div>
						</Typography>
					</div>
				</MuiModal>
			</div>
		</LayoutBlock>
	);
}

export default Projects;
