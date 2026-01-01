import React from 'react'
import styles from './adjust-panel-width.module.scss';
import { getPanelWidthFromSettings } from '../../../../backend/services/resume/resume-utils';
import { ASetDocSettings } from '../../../../backend/redux/reducers/document-reducer';
import { RootState } from '../../../../backend/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useThemeContext } from '../../../contexts/theme-context/theme-context';

const SecondaryPanelWidthSteps = Array(15).fill({}).map((item, index) => ({
	width: (index + 10) * 2
}));

function AdjustPanelWidth() {
	// redux hooks
	const dispatch = useDispatch();
	const docSettings = useSelector((state: RootState) => state.doc_config.settings);

	// theme context
	const { theme } = useThemeContext();

	function getNewWidth(index: number): number {
		if (index < 0 || index > SecondaryPanelWidthSteps.length - 1) {
			return getPanelWidthFromSettings(docSettings);
		}

		return SecondaryPanelWidthSteps[index].width;
	}

	function changeWidth(index?: number, direction?: -1 | 1): void {
		let width = getPanelWidthFromSettings(docSettings);
		if (typeof index === 'number') {
			width = getNewWidth(index);
		} else if (direction) {
			index = SecondaryPanelWidthSteps.findIndex((item) => item.width === width);
			width = getNewWidth(index + direction);
		}
		const newState = { ...docSettings };
		newState.secondaryPanelWidth = width;
		dispatch(ASetDocSettings({ ...newState }));
	}

	return (
		<div className={styles.adjustSizeContainer}>
			<div className={styles.btn} onClick={() => {
				changeWidth(undefined, -1);
			}}>
				<img src={`/assets/icons/common/${theme}-left-triangle.png`} alt='left' />
			</div>
			<div className={`${styles.scale}`} data-tooltip={'Adjust secondary panel width'}>
				{SecondaryPanelWidthSteps.map((item, index) =>
					<div
						key={index}
						className={`${styles.indicator} ${item.width === getPanelWidthFromSettings(docSettings) ? styles.active : ''}`}
						onClick={() => {
							changeWidth(index);
						}}>
						<header>&nbsp;</header>
					</div>)}
			</div>
			<div className={styles.btn} onClick={() => {
				changeWidth(undefined, 1);
			}}>
				<img src={`/assets/icons/common/${theme}-right-triangle.png`} alt='left' />
			</div>
		</div>
	)
}

export default AdjustPanelWidth