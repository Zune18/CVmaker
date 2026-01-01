import React, { useState } from 'react';
import LayoutBlock from '../../layouts/layout-block/layout-block';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './skills.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../backend/redux/store';
import { useLayoutContext } from '../../../../contexts/layout-context';
import { ASetSkills } from '../../../../../backend/redux/reducers/document-data-reducer';
import lodash from 'lodash';
import { useDataModel } from '../../../../hooks/useDataModel';
import { apiEndPoints } from '../../../../../backend/services/constants';
import equal from 'deep-equal';
import ResumeSectionEditIcon from '../../../shared/resume/sections/editIcon';
import SectionModalContainer from '../../../shared/resume/sections/sectionModalContainer';
import Typography from '@mui/material/Typography';
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
	overflow: 'hidden',
	display: 'flex',
	flexDirection: 'column'
};

function compareObjects(oldVal: any, newVal: any): boolean {
	return equal(oldVal, newVal);
}

const Skills = (props: any) => {
	// layout context
	const { pageNo, pageInfo } = useLayoutContext();

	// redux hooks
	const dispatch = useDispatch();
	const settings = useSelector((state: RootState) => state.doc_config.settings);
	const skills = useSelector((state: RootState) => state.doc_data.pagewise_data[pageNo]?.skills ?? []);
	// local states
	const [open, setOpen] = useState(false);
	const [skillItems, setSkillItems] = React.useState<any[]>([]);
	const [skillsToDelete, setSkillsToDelete] = useState<any[]>([]);

	const handleOpen: any = () => {
		setOpen(true);
		setSkillsToDelete([]);
		setSkillItems(lodash.cloneDeep(skills));
	};

	const handleClose: any = () => {
		setOpen(false);
	};

	// handle new item addition
	const handleAddItem: any = (newSkillItem: any) => {
		if (newSkillItem?.name?.length > 0) {
			skillItems.push({ ...newSkillItem, id: Math.random(),
				documentId: pageInfo.documentId, pageConfigId: pageInfo._id,
				skillRating: 5});
			setSkillItems([...skillItems]);
		}
	};
	const saveSkills: any = () => {
		setOpen(false);
		const updatedItems = [...skillItems];
		setSkillItems(updatedItems);
		dispatch(ASetSkills({ pageNo, skills: updatedItems }));
	};

	const handleRemoveItem: any = (index: number) => {
		const updatedItems = [...skillItems];
		const _deletedItems = updatedItems.splice(index, 1) ?? [];
		const _deletedSkillsIds = _deletedItems.map((item) => item.id ?? item._id);
		setSkillsToDelete(prev => [...prev, ..._deletedSkillsIds]);
		setSkillItems(updatedItems);
	};

	const syncSkillsAPI = useDataModel({
		apiEndpoint: apiEndPoints.sync_skills,
		onApiSuccess: (res) => {
		},
		onApiError: (err) => {
			console.log({ err });
		}
	});
	return (
		<LayoutBlock key={props.id} id={props.id} {...props}>
			{/* Skills List */}
			<div className={styles.container}>
				<div className={styles.skillList}>
					{skills.map((item: any, index: number) => (
						<div
							style={{ background: settings.bgColor, color: settings.bgColor ? '#FFF' : '#000' }}
							className={styles.skillelement}
							key={index}
							draggable
						>
							{item && <div>{toTitleCase (item.name)}</div>}
						</div>
					))}
				</div>
			</div>
			{/* Edit Icon */}
			<ResumeSectionEditIcon onClick={handleOpen} />
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
    					<SectionModalContainer
    					    title='Enter Your Skills'
    					    listItems={skillItems}
    					    onSave={() => {
    					        saveSkills();
    					    }}
    					    onDeleteItem={(index: number) => {
    					        handleRemoveItem(index);
    					    }}
    					    onAddItem={(item: any) => {
    					        handleAddItem(item);
    					    }}
    					    sortSetList={(list: any) => {
    					        setSkillItems([...list]);
    					    }}
    					/>
					</Typography>
				</Box>
			</Modal>
		</LayoutBlock>
	);
};

export default Skills;