import BorderColorIcon from '@mui/icons-material/BorderColor';
import React from 'react';
import styles from './addIcon.module.scss';
import AddIcon from '@mui/icons-material/Add';

interface IResumeSectionAddIcon {
    onClick: () => void;
}

const ResumeSectionAddIcon : any = (props: IResumeSectionAddIcon) => (
	<div className={styles.addButtonDiv} >
		<div onClick={() => {
			props.onClick();
		}} className={styles.addButton}>
			<AddIcon fontSize={'small'} className={styles.addButtonIcon}/>
		</div>
	</div>

);

export default ResumeSectionAddIcon;