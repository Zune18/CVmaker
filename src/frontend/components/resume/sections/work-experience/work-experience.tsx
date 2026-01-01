import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LayoutBlock from '../../layouts/layout-block/layout-block';
import AddIcon from '@mui/icons-material/Add';
import styles from './work-experience.module.scss';
import TextField from '@mui/material/TextField';
import MuiModal from '../../../Global/mui-modal/mui-modal';
import DeleteIcon from '@mui/icons-material/Delete';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../backend/redux/store';
import { useLayoutContext } from '../../../../contexts/layout-context';
import { ASetWorkExps } from '../../../../../backend/redux/reducers/document-data-reducer';
import EditAndDeleteIconsContainer from '../../../shared/resume/sections/editAndDeleteIconsContainer';
import ResumeSectionAddIcon from '../../../shared/resume/sections/addIcon';
import lo from 'lodash'
import {convertDateToString} from "../../../../common/svc-utils";
import convertToInputDateFormat from "../../../../common/convertToInputDateFormat";

class WorkExperienceData {
	company_name: string = '';
	title: string = '';
	sdate: Date = new Date();
	edate: Date = new Date();
	role: string = '';
	technologies_used: string = '';
	info: string[] = [];
	link: string = '';
}

function WorkExperience(props: any) {
	const settings = useSelector((state: RootState) => state.doc_config.settings);
	// layout context
	const { pageNo, pageInfo } = useLayoutContext();

	const workExperienceDetails = useSelector((state: RootState) => state.doc_data.pagewise_data[pageNo] ?
		state.doc_data.pagewise_data[pageNo]?.work_exps : []) || [];

	// redux hooks
	const dispatch = useDispatch();
	const [modelData, setModelData] = useState<WorkExperienceData>(new WorkExperienceData());
	const [open, setOpen] = useState(false);
	const [openTextArea, setOpenTextArea] = useState(false);
	const [secondModalOpen, setSecondModalOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [inputItems, setInputItems] = useState<string[]>([]);
	const [inputValue, setInputValue] = useState('');

	function setWorkExperienceDetails(existingData: any, newItem?: any) {
		const updatedData = lo.cloneDeep(existingData);
		if (newItem) {
			updatedData.push(newItem)
		}
		dispatch(ASetWorkExps({ pageNo, work_exps: [...updatedData] }));
	}

	const handleToggleTextArea = () => {
		setOpenTextArea(!openTextArea);
	};

	const addNewWorkExpModelOpen = () => {
		setOpen(true);
		setModelData(new WorkExperienceData())
	};

	const handleClose = () => {
		setOpen(false);
		setSecondModalOpen(false);
		setOpenTextArea(false);
	};

	const handleAddItem = () => {
		const newItem: WorkExperienceData = {
			...modelData,
			info: [...inputItems]
		};
		setWorkExperienceDetails(workExperienceDetails, newItem);
		setOpen(false);
	};

	const handleUpdateModalOpen = (index: number) => {
		setModelData(workExperienceDetails[index]);
		setSelectedIndex(index);
		setSecondModalOpen(true);
		setInputItems(workExperienceDetails[index].info); // Set inputItems to the info array of the selected item
	};

	const handleRemoveItem = (index: number) => {
		const updatedWorkExperienceDetails = [...workExperienceDetails];
		updatedWorkExperienceDetails.splice(index, 1);
		setWorkExperienceDetails(updatedWorkExperienceDetails);
		setSecondModalOpen(false);
	};

	const handleUpdateItem = () => {
		if (modelData && selectedIndex !== null) {
			const updatedWorkExperienceDetails = [...workExperienceDetails];
			updatedWorkExperienceDetails[selectedIndex] = {
				...modelData,
				info: [...inputItems] // Update the info array with the new inputItems
			};
			setWorkExperienceDetails(updatedWorkExperienceDetails);
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
	console.log({modelData})
	return (
		<LayoutBlock key={props.id} {...props}>
			<div className={styles.container}>
				{workExperienceDetails.map((item: any, index: number) => (
					<div key={item.title} className={styles.workExperienceDetailsList}>
						<div className={styles.workExperienceDetailsElement}>
							<div className={styles.workExperienceDetailsSectionsContainer}>
								<Brightness1Icon className={styles.workExperienceDetailsRightSectionsIcon} />
								<div className={styles.workExperienceDetailsRightSections}>
									<div className={styles.workExperienceDetailsElementTitle}>{item.title}</div>
									<div className={styles.workExperienceDetailsElementContainer}>
										<header className={styles.workExperienceDetailsElementInstitutionName}>{item.company_name}</header>
										<div className={styles.workExperienceDates}>
											<div className={styles.workExperienceDetailsElementStarting}>
												{convertDateToString(item.sdate)} -
											</div>
											<div className={styles.workExperienceDetailsElementEnding}>
												{convertDateToString(item.edate)}
											</div>
										</div>
										<div className={styles.workExperienceDetailsElementRole}>{item.role}</div>
										<div className={styles.workExperienceDetailsElementTechnology}>
											{item.technologies_used}
										</div>
										<div className={styles.workExperienceDetailsElementLink}>{item.link}</div>
										<div className={styles.workExperienceDetailsElementInfo}>
											{item.info.map((infoItem: any, infoIndex: number) => (
												<div key={infoIndex}> &#x2022; {infoItem}</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* TODO: to be made into a shared toolbar component with scope to add more functional buttons */}
						<div className={styles.editAndDeleteIconsContainer}>
							<EditAndDeleteIconsContainer
								itemDetails={workExperienceDetails}
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
					<ResumeSectionAddIcon onClick={addNewWorkExpModelOpen} />
				</div>

				{/* add modal  */}
				<MuiModal open={open} setOpen={setOpen}>
					<div className={styles.modalContainer}>
						<Typography id='modal-modal-title' variant='h6' component='h2'>
							<div className={styles.modaltitle}>Fill up Work Experience Details</div>
							<div className={styles.submitButton}>
								<Button
									variant='outlined'
									size={'small'}
									className={styles.exitButton}
									onClick={handleClose}
								>
									Cancel
								</Button>
								<Button variant='contained' size={'small'} onClick={handleAddItem}>
									Save
								</Button>
							</div>
							<div className={styles.inputContainer}>
								<div className={styles.inputRow}>
									<TextField
										className={styles.inputBox}
										type='text'
										label='Title'
										variant='standard'
										placeholder='Title'
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
										type='text'
										label='Institution'
										variant='standard'
										placeholder='Institution'
										value={modelData.company_name}
										onChange={(event) => {
											setModelData({
												...modelData,
												company_name: event.target.value
											});
										}}
									/>
								</div>
								<div className={styles.inputRow}>
									<TextField
										className={styles.inputBox}
										type='date'
										onChange={(event) => {
											setModelData({
												...modelData,
												sdate: new Date(event.target.value)
											});
										}}
									/>
									<TextField
										className={styles.inputBox}
										type='date'
										onChange={(event) => {
											const newDate = new Date(event.target.value);
											setModelData({
												...modelData,
												edate: newDate
											});
										}}
									/>
								</div>
								<div className={styles.inputRow}>
									<TextField
										className={styles.inputBox}
										type='text'
										label='Role'
										variant='standard'
										placeholder='Role'
										value={modelData.role}
										onChange={(event) => {
											setModelData({
												...modelData,
												role: event.target.value
											});
										}}
									/>
									<TextField
										className={styles.inputBox}
										type='text'
										label='Technologies Used'
										variant='standard'
										placeholder='Technologies Used'
										value={modelData.technologies_used}
										onChange={(event) => {
											setModelData({
												...modelData,
												technologies_used: event.target.value
											});
										}}
									/>
								</div>
								<TextField
									className={styles.info}
									type='text'
									label='Link'
									variant='standard'
									placeholder='Link'
									value={modelData.link}
									onChange={(event) => {
										setModelData({
											...modelData,
											link: event.target.value
										});
									}}
								/>

								{/* TODO: should not be conditional, it needs to be always visible */}
								<div className={styles.infoListArea}>
									<div className={styles.infoContainer}>
										<div className={styles.inputInfoAndAddButtonContainer}>
											<TextField
												className={styles.info}
												type='text'
												label='Info'
												variant='standard'
												placeholder='Info'
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

				{/* TODO[duplicate code]: unnecessary edit modal use the add modal in edit mode */}
				{/* edit modal  */}
				<MuiModal open={secondModalOpen} setOpen={setSecondModalOpen}>
					<div className={styles.modalContainer}>
						<Typography id='modal-modal-title'>
							<div className={styles.modaltitle}>Update Work Experience Details</div>
							<div className={styles.submitButton}>
								<Button
									variant='outlined'
									size={'small'}
									className={styles.exitButton}
									onClick={handleClose}
								>
									Cancel
								</Button>
								<Button variant='contained' size={'small'} onClick={handleUpdateItem}>
									Update
								</Button>
							</div>
							<div className={styles.inputContainer}>
								<div className={styles.inputRow}>
									<TextField
										className={styles.inputBox}
										label='Title'
										type='text'
										variant='standard'
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
										type='text'
										label='Institution'
										variant='standard'
										value={modelData.company_name}
										onChange={(event) => {
											setModelData({
												...modelData,
												company_name: event.target.value
											});
										}}
									/>
								</div>
								<div className={styles.inputRow}>
									<TextField
										className={styles.inputBox}
										type='date'
										defaultValue={convertToInputDateFormat(modelData.sdate)}
										onChange={(event) => {
											const selectedDate = new Date(event.target.value);
											setModelData({
												...modelData,
												sdate: selectedDate
											});
										}}
									/>
									<TextField
										className={styles.inputBox}
										type='date'
										value={convertToInputDateFormat(modelData.edate)}
										onChange={(event) => {
											const selectedDate = new Date(event.target.value);
											setModelData({
												...modelData,
												edate: selectedDate
											});
										}}
									/>
								</div>
								<div className={styles.inputRow}>
									<TextField
										className={styles.inputBox}
										type='text'
										label='Role'
										variant='standard'
										value={modelData.role}
										onChange={(event) => {
											setModelData({
												...modelData,
												role: event.target.value
											});
										}}
									/>
									<TextField
										className={styles.inputBox}
										type='text'
										label='Technologies Used'
										variant='standard'
										value={modelData.technologies_used}
										onChange={(event) => {
											setModelData({
												...modelData,
												technologies_used: event.target.value
											});
										}}
									/>
								</div>
								<TextField
									className={styles.info}
									label='Link'
									type='text'
									variant='standard'
									value={modelData.link}
									onChange={(event) => {
										setModelData({
											...modelData,
											link: event.target.value
										});
									}}
								/>
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

export default WorkExperience;
