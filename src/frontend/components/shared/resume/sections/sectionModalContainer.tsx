import React from 'react';
import styles from './section.module.scss';
import TextField from '@mui/material/TextField';
import { ReactSortable } from 'react-sortablejs';
import { toTitleCase } from '../../../../common/svc-utils';
import DeleteIcon from '@mui/icons-material/Delete';

interface IResumeSectionModalContainer {
    onSave: () => void;
    onDeleteItem: (index: number) => void;
    onAddItem: (itemInfo: any) => void;
    listItems: any;
    sortSetList: (list: any) => void;
}

const SectionModalContainer: any = (props: IResumeSectionModalContainer) => {
	const [newItem, setNewItem] = React.useState<any>({});

	return (
		<div className={styles.container}>
			<div className={styles.modalHeaderContainer}>
				<div className={styles.modalTitle}>
                    items List
				</div>
				<div
					onClick={() => {
						props.onSave();
					}}
					className={styles.saveButton}
				>
                    Save
				</div>
			</div>
			<div className={styles.inputGroup}>
				<TextField
					className={styles.inputBox}
					type='text'
					value={newItem.name}
					onChange={(ev: any) => {
						newItem.name = ev.target.value;
						setNewItem({ ...newItem });
					}}
				/>
				<button
					onClick={() => {
						props.onAddItem(newItem);
						setNewItem({name: ''});
					}}
					className={styles.modalAddButton}
				>
                    Add item
				</button>
			</div>
			<div className={styles.itemListModal}>
				<ReactSortable
					group={'panel-group'}
					tag={'ul'}
					list={props.listItems}
					setList={(list) => {
						props.sortSetList(list);
					}}
				>
					{props.listItems.map(
						(item: any, index: number) => (
							<li key={item.id}>
								<div
									key={index}
									className={
										styles.listGroup
									}
								>
									<div
										className={
											styles.listItem
										}
										contentEditable = "true"
									>
										{toTitleCase(item.name)}
									</div>
									<button
										className={
											styles.removeButton
										}
										onClick={() => {
											props.onDeleteItem(index);
										}}
									>
										<DeleteIcon
											className={
												styles.removeIcon
											}
										/>
									</button>
								</div>
							</li>
						)
					)}
				</ReactSortable>
			</div>
		</div>);
};

export default SectionModalContainer;