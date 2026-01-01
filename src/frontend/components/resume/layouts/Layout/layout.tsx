import React, { useEffect, useState } from 'react';
import styles from './layout.module.scss';
import AboutMe from '../../sections/about-me/about-me';
import { getSectionWiseDetails } from '../constants/config-constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../backend/redux/store';
import { ASetConfigPanels } from '../../../../../backend/redux/reducers/document-reducer';
import SecondaryPanel from './secondary-panel';
import MainPanel from './main-panel';
import { E_IntroPosition, E_SecondaryPanelPosition } from '../../../../../backend/services/resume/doc-config.interface';
import { CustomCssVariables } from '../../../../../styles/css.interface';
import { usePageWiseDataSync } from '../../../../hooks/use-page-wise-data-sync';
import { usePageWiseConfigSync } from '../../../../hooks/use-page-wise-config-sync';
import { useLayoutContext } from '../../../../contexts/layout-context';

interface I_LayoutProps {
	index: number;
	pageNo: string;
}

function Layout({ pageNo, index }: I_LayoutProps) {
	// redux hooks
	const config = useSelector((state: RootState) => state.doc_config.config[pageNo]);
	const settings = useSelector((state: RootState) => state.doc_config.settings);

	// data syncing
	const configSync = usePageWiseConfigSync({ pageNo });
	const dataSync = usePageWiseDataSync({ pageNo });

	// layout context
	const { mainList, setMainList, secondaryList, setSecondaryList, refreshLists } = useLayoutContext();

	function getFontSize(): number {
		if (settings.fontSize === 'small') {
			return -1;
		} else if (settings.fontSize === 'large') {
			return 1;
		}
		return 0;
	}

	const layoutStyle: CustomCssVariables = { '--doc-font-size': `${getFontSize()}px` };

	return (
		<>
			<div className={styles.mainLayout} id={pageNo} style={layoutStyle}>
				{/* eslint-disable-next-line max-len */}
				{(settings.introPosition === E_IntroPosition.top && index === 0 || (!config.isSecPanelVisible && settings.introPosition !== E_IntroPosition.main)) ?
					<AboutMe /> : null}
				<div className={styles.panelContainer}>
					{/* Secondary Panel */}
					{config.isSecPanelVisible && config.secPanelPos !== E_SecondaryPanelPosition.right ? (
						<SecondaryPanel pageNo={pageNo} settings={settings} config={config} list={secondaryList}
							setList={setSecondaryList} index={index} />
					) : null}

					{/* Main Panel */}
					<MainPanel pageNo={pageNo} settings={settings} config={config} list={mainList} setList={setMainList}
							   index={index} />

					{/* Secondary Panel */}
					{config.isSecPanelVisible && config.secPanelPos === E_SecondaryPanelPosition.right ? (
						<SecondaryPanel pageNo={pageNo} settings={settings} config={config} list={secondaryList}
							setList={setSecondaryList} index={index} />
					) : null}
				</div>
			</div>
		</>
	);
}

export default Layout;