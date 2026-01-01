import React, { useState } from 'react';
import Box from '@mui/material/Box';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import InterestsIcon from '@mui/icons-material/Interests';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DescriptionIcon from '@mui/icons-material/Description';

import {
	ESectionsNames,
	ESectionTypes,
	getSectionWiseDetails,
	IGetSectionDetailsParams,
	ISectionDetail
} from '../../resume/layouts/constants/config-constants';
import { ReactSortable } from 'react-sortablejs';
import styles from './left-side-drawer.module.scss';

const BOX_STYLES = {
	position: 'fixed' as 'fixed',
	top: '16px',
	left: '12px',
	width: '176px',
	height: '80vh',
	bgcolor: 'background.secondary',
	backdropFilter: 'saturate(180%) blur(10px)',
	borderRadius: '4px',
	boxShadow: 24,
	outline: 'none',
	p: 2,
	wordBreak: 'break-all'
};

const NEW_SECTIONS: IGetSectionDetailsParams[] = [
	{
		iconUrl: <PsychologyIcon />,
		section: ESectionsNames.skills,
		sectionType: ESectionTypes.software,
		customLabel: '',
		defaultLabel: ESectionsNames.skills
	},
	{
		iconUrl: <WorkIcon/>,
		section: ESectionsNames.work,
		sectionType: ESectionTypes.software,
		customLabel: '',
		defaultLabel: ESectionsNames.work
	},
	{
		iconUrl: <SchoolIcon/>,
		section: ESectionsNames.education,
		sectionType: ESectionTypes.software,
		customLabel: '',
		defaultLabel: ESectionsNames.education
	},
	{
		iconUrl: <InterestsIcon/>,
		section: ESectionsNames.interests,
		sectionType: ESectionTypes.software,
		customLabel: '',
		defaultLabel: ESectionsNames.interests
	},
	{
		iconUrl: <DescriptionIcon />,
		section: ESectionsNames.projects,
		sectionType: ESectionTypes.software,
		customLabel: '',
		defaultLabel: ESectionsNames.projects
	},
	{
		iconUrl: <EmojiEventsIcon/>,
		section: ESectionsNames.achievements,
		sectionType: ESectionTypes.software,
		customLabel: '',
		defaultLabel: ESectionsNames.achievements
	}
];

const NEW_SECTION_ELEMENTS = getSectionWiseDetails(NEW_SECTIONS);

export function LeftSideDrawer() {
	const [list, setList] = useState<ISectionDetail[]>(NEW_SECTION_ELEMENTS);

	return (
		<Box sx={BOX_STYLES}>
			<div className={styles.newSectionsList}>
				<ReactSortable
					group={{
						name: 'panel-group',
						pull: 'clone',
						put: false
					}}
					sort={false}
					tag={'ul'}
					list={list}
					setList={setList}
				>
					{list.map((item: ISectionDetail) => (
						<li key={item.id} data-tooltip={'Drag to add new section'}>
							<Box sx={{ bgcolor: 'background.primary' }} className={styles.newSectionContainer}>
								<div className={styles.sectionIcons}>
									{item.config?.iconUrl}
								</div> {/* Display the icon */}
								<header className={styles.sectionHeading}>
									{item.config?.section}
								</header>
							</Box>
						</li>
					))}
				</ReactSortable>
			</div>
		</Box>
	);
}