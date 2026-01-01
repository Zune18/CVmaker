import BorderColorIcon from '@mui/icons-material/BorderColor';
import React from 'react';
import styles from './section.module.scss';

interface IResumeSectionEditIcon {
    onClick: () => void;
}

const ResumeSectionEditIcon : any = (props: IResumeSectionEditIcon) => (
	<div className={styles.sectionEditIconContainer}>
		<div
			onClick={() => {
				props.onClick();
			}}
			className={styles.sectionEditIconBody}
		>
			<BorderColorIcon fontSize={'small'} className={styles.sectionEditIcon} />
		</div>
	</div>

);

export default ResumeSectionEditIcon;