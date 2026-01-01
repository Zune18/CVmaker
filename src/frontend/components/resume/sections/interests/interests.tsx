import React, { useState } from 'react';
import LayoutBlock from '../../layouts/layout-block/layout-block';
import { useLayoutContext } from '../../../../contexts/layout-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../backend/redux/store';
import Box from '@mui/material/Box';
import styles from './interests.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {ASetInterests, ASetSkills} from '../../../../../backend/redux/reducers/document-data-reducer';
import lodash from 'lodash';
import { useDataModel } from '../../../../hooks/useDataModel';
import { apiEndPoints } from '../../../../../backend/services/constants';
import equal from 'deep-equal';
import ResumeSectionEditIcon from '../../../shared/resume/sections/editIcon';
import SectionModalContainer from '../../../shared/resume/sections/sectionModalContainer';
import { toTitleCase } from '../../../../common/svc-utils';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 450,
	height: 450,
	bgcolor: 'background.paper',
	boxShadow: 24,
	outline: 'none',
	borderRadius: '16px',
	overflow: 'hidden'
};

function compareObjects(oldVal: any, newVal: any): boolean {
	return equal(oldVal, newVal);
}

const Interests: any = (props: any) => {
	// layout context
	const { pageNo, pageInfo } = useLayoutContext();

	// redux hooks
	const dispatch = useDispatch();
	const settings = useSelector((state: RootState) => state.doc_config.settings);
	const interests = useSelector((state: RootState) => state.doc_data.pagewise_data[pageNo] ?
		state.doc_data.pagewise_data[pageNo]?.interests : []) || [];

	// local states
	const [open, setOpen] = useState(false);
	const [interestItems, setInterestItems] = React.useState<any[]>([]);
	const [interestsToDelete, setInterestsToDelete] = useState<any[]>([]);

	const handleOpen: any = () => {
		setOpen(true);
		setInterestsToDelete([]);
		setInterestItems(lodash.cloneDeep(interests));
	};

	const handleClose: any = () => {
		setOpen(false);
	};

	// handle new item addition
	const handleAddItem: any = (newInterestItem: any) => {
		if (newInterestItem?.name?.length > 0) {
			interestItems.push({ ...newInterestItem, documentId: pageInfo.documentId, pageConfigId: pageInfo._id, interestRating: 5 });
			setInterestItems([...interestItems]);
		}
	};

	const saveInterests: any = () => {
		setOpen(false);
		const updatedItems = [...interestItems];
		setInterestItems(updatedItems);
		dispatch(ASetInterests({ pageNo, interests: updatedItems }));
	};

	const handleRemoveItem: any = (index: number) => {
		const updatedItems = [...interestItems];
		const _deletedItems = updatedItems.splice(index, 1) ?? [];
		const _deletedInterestsIds = _deletedItems.map((item) => item.id ?? item._id);
		setInterestsToDelete(prev => [...prev, ..._deletedInterestsIds]);
		setInterestItems(updatedItems);
	};

	const syncInterestsAPI = useDataModel({
		apiEndpoint: apiEndPoints.sync_interests,
		onApiSuccess: (res) => {
		},
		onApiError: (err) => {
			console.log({ err });
		}
	});

	return (
		<LayoutBlock key={props.id} id={props.id} {...props}>
			{/* Interests List */}
			<div className={styles.container}>
				<div className={styles.interestList}>
					{interests.map((item: any, index: number) => (
						<div
							className={styles.interestelement}
							key={index}
							draggable
						>
							{item && <div>{toTitleCase(item.name)}</div>}
						</div>
					))}
				</div>
			</div>
			{/* Edit Icon */}
			<ResumeSectionEditIcon onClick={handleOpen} />

			{/* TODO: use MuiModal component */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography
						id='modal-modal-title'
						variant='h6'
						component='h2'
					>
						<SectionModalContainer
							title='Enter Your Interests'
							listItems={interestItems}
							onSave={() => {
								saveInterests();
							}}
							onDeleteItem={(index: number) => {
								handleRemoveItem(index);
							}}
							onAddItem={(item: any) => {
								handleAddItem(item);
							}}
							sortSetList={(list: any) => {
								setInterestItems([...list]);
							}}
						/>
					</Typography>
				</Box>
			</Modal>
		</LayoutBlock>
	);
};

export default Interests;