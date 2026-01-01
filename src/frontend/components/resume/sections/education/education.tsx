import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LayoutBlock from '../../layouts/layout-block/layout-block';
import AddIcon from '@mui/icons-material/Add';
import styles from './education.module.scss';
import TextField from '@mui/material/TextField';
import MuiModal from '../../../Global/mui-modal/mui-modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useLayoutContext } from '../../../../contexts/layout-context';
import EditAndDeleteIconsContainer from '../../../shared/resume/sections/editAndDeleteIconsContainer';
import ResumeSectionAddIcon from '../../../shared/resume/sections/addIcon';
import {ASetEducations} from '../../../../../backend/redux/reducers/document-data-reducer';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../backend/redux/store";
import lo from "lodash";
import {convertDateToString} from "../../../../common/svc-utils";
import convertToInputDateFormat from "../../../../common/convertToInputDateFormat";

class EducationData {
	school_name: string = '';
	title: string = '';
	sdate: Date = new Date();
	edate: Date = new Date();
	stream: string = '';
	address: string = '';
	score_label: string = '';
	score: string = '';
}

function Education(props: any) {
	const settings = useSelector((state: RootState) => state.doc_config.settings);
	// layout context
	const { pageNo, pageInfo } = useLayoutContext();
	const educationDetails = useSelector((state: RootState) => state.doc_data.pagewise_data[pageNo] ?
		state.doc_data.pagewise_data[pageNo]?.educations : []) || [];
	// redux hooks
	const dispatch = useDispatch();
	const [modelData, setModelData] = useState<EducationData>(new EducationData());
	const [open, setOpen] = useState(false);
	const [secondModalOpen, setSecondModalOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	function setEducationDetails(existingData: any, newItem?: any){
		const updatedData = lo.cloneDeep(existingData);
		if (newItem) {
			updatedData.push(newItem)
		}
		dispatch(ASetEducations({ pageNo, educations: [...updatedData] }));
	};

	const handleOpen = () => {
		setOpen(true);
	};
	function handleClose() {
		setOpen(false);
		setSecondModalOpen(false);
	}

	const handleAddItem = () => {
		setEducationDetails( educationDetails, modelData);
		setOpen(false);
	};

	const handleUpdateModalOpen = (index: number) => {
		setModelData(educationDetails[index]);
		setSelectedIndex(index);
		setSecondModalOpen(true);
	};
	const handleRemoveItem = (index: number) => {
		const updatedItems = [...educationDetails];
		updatedItems.splice(index, 1);
		setEducationDetails(updatedItems);
		setSecondModalOpen(false);
	};
	const handleUpdateItem = () => {
		if (modelData && selectedIndex !== null) {
			const updatedEducationDetails = [...educationDetails];
			updatedEducationDetails[selectedIndex] = {
				...modelData
			};
			setEducationDetails(updatedEducationDetails);
			setSecondModalOpen(false);
		}
	};

	return (
		<LayoutBlock key={props.id} {...props}>
			<div className={styles.container}>
				{educationDetails.map((item: any, index: number)  => (
					<div key={item.title} className={styles.educationDetailsList}>
						<div className={styles.educationDetailsElement}>
							<div className={styles.educationDetailsElementTitle}>{item.title}</div>
							<div className={styles.educationDetailsElementInstitutionName}>{item.school_name}</div>
							<div className={styles.educationDetailsElement}>{item.address}</div>
							<div className={styles.educationDates}>
								<div className={styles.educationDates}>
									{convertDateToString(item.sdate)}
								</div>
								<div className={styles.educationDates}>
									- {convertDateToString(item.edate)}
								</div>
							</div>
							<div className={styles.educationDetailsElement}>
								{item.stream}
							</div>
							{item.score_label &&(
								<div className={styles.educationDetailsScoreDetailsContainer}>
									{item.score_label} :&nbsp;
									<div className={styles.educationDetailsElement}>
										{item.score}
									</div>
								</div>
							)}
						</div>

						{/* shared toolbar component	 */}
						<div className={styles.editAndDeleteIconsContainer}>
							<EditAndDeleteIconsContainer
								itemDetails={educationDetails}
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
                                    Fill up Education Details
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
											label="Institurion"
											variant="standard"
											placeholder="Institution"
											onChange={(event) => {
												setModelData({
													...modelData,
													school_name:
                                                        event.target.value
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
									<div className={styles.inputRow}>
										<TextField
											className={styles.inputBox}
											type="text"
											label="Stream"
											variant="standard"
											placeholder="stream"
											onChange={(event) => {
												setModelData({
													...modelData,
													stream: event.target.value
												});
											}}
										/>
										<TextField
											className={styles.inputBox}
											type="text"
											label="Address"
											variant="standard"
											placeholder="address"
											onChange={(event) => {
												setModelData({
													...modelData,
													address: event.target.value
												});
											}}
										/>
									</div>
									<div className={styles.inputRow}>
										<TextField
											className={styles.inputBox}
											type="text"
											label="Score Label"
											variant="standard"
											placeholder="score label"
											onChange={(event) => {
												setModelData({
													...modelData,
													score_label:
                                                        event.target.value
												});
											}}
										/>
										<TextField
											className={styles.inputBox}
											type="text"
											label="Score"
											variant="standard"
											placeholder="score"
											onChange={(event) => {
												setModelData({
													...modelData,
													score: event.target.value
												});
											}}
										/>
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
                                Update Education Details
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
										label="Institution"
										variant="standard"
										value={modelData.school_name}
										onChange={(event) => {
											setModelData({
												...modelData,
												school_name: event.target.value
											});
										}}
									/>
								</div>

								<div className={styles.inputRow}>
									<TextField
										className={styles.inputBox}
										type="date"
										value={convertToInputDateFormat(modelData.edate)}
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
								<div className={styles.inputRow}>
									<TextField
										className={styles.inputBox}
										type="text"
										label="Stream"
										variant="standard"
										value={modelData.stream}
										onChange={(event) => {
											setModelData({
												...modelData,
												stream: event.target.value
											});
										}}
									/>
									<TextField
										className={styles.inputBox}
										type="text"
										label="Address"
										variant="standard"
										value={modelData.address}
										onChange={(event) => {
											setModelData({
												...modelData,
												address: event.target.value
											});
										}}
									/>
								</div>
								<div className={styles.inputRow}>
									<TextField
										className={styles.inputBox}
										label="Score Label"
										type="text"
										variant="standard"
										value={modelData.score_label}
										onChange={(event) => {
											setModelData({
												...modelData,
												score_label: event.target.value
											});
										}}
									/>
									<TextField
										className={styles.inputBox}
										type="text"
										variant="standard"
										label="Score"
										value={modelData.score}
										onChange={(event) => {
											setModelData({
												...modelData,
												score: event.target.value
											});
										}}
									/>
								</div>
							</div>
						</Typography>
					</div>
				</MuiModal>
			</div>
		</LayoutBlock>
	);
}

export default Education;
