import React from 'react';
import styles from './editAndDeleteIconsContainer.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

interface iEditDeleteIconContainer {
    onDelete: () => void;
    onEdit: () => void;
}

const EditAndDeleteIconsContainer: any = (props: iEditDeleteIconContainer)  => {
	return (
		<div className={styles.editRemoveButtonDiv}>
			<div className={styles.buttonContainer}>
				<div onClick={props.onDelete} className={styles.deleteButton}>
					<DeleteIcon fontSize={'small'} className={styles.buttonIcon} />
				</div>
			</div>

			<div className={styles.buttonContainer}>
				<div onClick={props.onEdit} className={styles.editButton}>
					<BorderColorIcon fontSize={'small'} className={styles.buttonIcon} />
				</div>
			</div>
		</div>
	);
};

export default EditAndDeleteIconsContainer;
