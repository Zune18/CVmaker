import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LayoutBlock from '../../layouts/layout-block/layout-block';
import styles from './achievements.module.scss';
import TextField from '@mui/material/TextField';
import MuiModal from '../../../Global/mui-modal/mui-modal';
import ResumeSectionAddIcon from '../../../shared/resume/sections/addIcon';
import EditAndDeleteIconsContainer from '../../../shared/resume/sections/editAndDeleteIconsContainer';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../backend/redux/store";
import {useLayoutContext} from "../../../../contexts/layout-context";
import lo from "lodash";
import {ASetAchievements, ASetWorkExps} from "../../../../../backend/redux/reducers/document-data-reducer";

class AchievementsData {
	info: string = '';
	title: string = '';
}

function Achievements(props: any) {
	const settings = useSelector((state: RootState) => state.doc_config.settings);
	// layout context
	const { pageNo, pageInfo } = useLayoutContext();

	const achievementsDetails = useSelector((state: RootState) => state.doc_data.pagewise_data[pageNo] ?
		state.doc_data.pagewise_data[pageNo]?.achievements : []) || [];
		// redux hooks
	const dispatch = useDispatch();
	const [modelData, setModelData] = useState<AchievementsData>(new AchievementsData());
	const [open, setOpen] = useState(false);
	const [secondModalOpen, setSecondModalOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	function setAchievementsDetails(existingData: any, newItem?: any) {
		const updatedData = lo.cloneDeep(existingData);
		if (newItem) {
			updatedData.push(newItem)
		}
		dispatch(ASetAchievements({ pageNo, achievements: [...updatedData] }));
	}

	const handleOpen = () => {
		setOpen(true);
	};
	function handleClose() {
		setOpen(false);
		setSecondModalOpen(false);
	}

	const handleAddItem = () => {
		const newItem: AchievementsData = {
			...modelData
		};
		setAchievementsDetails(achievementsDetails, newItem);
		setOpen(false);
	};

	const handleUpdateModalOpen = (index: number) => {
		setModelData(achievementsDetails[index]);
		setSelectedIndex(index);
		setSecondModalOpen(true);
	};
	const handleRemoveItem = (index: number) => {
		const updatedItems = [...achievementsDetails];
		updatedItems.splice(index, 1);
		setAchievementsDetails(updatedItems);
		setSecondModalOpen(false);
	};

	const handleUpdateItem = () => {
		if (modelData && selectedIndex !== null) {
			const updatedAchievementsDetails = [...achievementsDetails];
			updatedAchievementsDetails[selectedIndex] = modelData;
			setAchievementsDetails(updatedAchievementsDetails);
			setSecondModalOpen(false);
		}
	};

	return (
		<LayoutBlock key={props.id} {...props}>
			<div className={styles.container}>
				{achievementsDetails.map((item: any, index: number) => (
					<div key={item.title} className={styles.achievementsDetailsList}>
						<div className={styles.achievementsDetailsElement}
							onClick={() => {handleUpdateModalOpen(index);}}
						>
							<div className={styles.achievementsDetailsElementTitle}>{item.title}</div>
							{item.info ? (
							    <div className={styles.achievementsDetailsElementInstitutionName}>
							        &#x2022;<div className={styles.info}>{item.info}</div>
							    </div>
							) : null}
						</div>
						<div className={styles.editAndDeleteIconsContainer}>
							<EditAndDeleteIconsContainer
								itemDetails={achievementsDetails}
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
                                    Fill up Achievements Details
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
													info:
                                                        event.target.value
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
                                Update Achievements Details
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
										value={modelData.info}
										onChange={(event) => {
											setModelData({
												...modelData,
												info: event.target.value
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

export default Achievements;
