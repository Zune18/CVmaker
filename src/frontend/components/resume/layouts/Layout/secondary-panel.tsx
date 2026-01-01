import React from 'react';
import styles from './layout.module.scss';
import AboutMe from '../../sections/about-me/about-me';
import { ReactSortable } from 'react-sortablejs';
import {
	E_IntroPosition,
	E_PanelNames,
	I_DocConfig,
	I_DocSettings
} from '../../../../../backend/services/resume/doc-config.interface';
import { getPanelWidths } from '../../../../../backend/services/resume/resume-utils';
import { store } from '../../../../../backend/redux/store';

interface ISecondaryPanel {
	settings: I_DocSettings;
	config: I_DocConfig;
	list: any[];
	setList: any;
	index: number;
	pageNo: string;
}

const SecondaryPanel = (props: ISecondaryPanel) => (
	<div className={styles.leftPanel} style={{ width: getPanelWidths(props.settings, props.config).secondary }}>
		{props.settings.introPosition === E_IntroPosition.secondary && props.index === 0 ? <AboutMe /> : null}
		<ReactSortable group={{
			name: 'panel-group',
			put: (to, from, ev) => {
				const _store = store.getState().doc_config.config[props.pageNo] ?? {}
				const _mainPanel = _store?.mainPanel ?? []
				const _secondaryPanels = _store?.secondaryPanel ?? []
				const _list = _mainPanel.concat(_secondaryPanels)
				const exits = _list.some((item) => ev.attributes[1].nodeValue?.startsWith(item.section))
				return !exits;
			}
		}} tag={'ul'} list={props.list} setList={props.setList}>
			{props.list.map((item: any) => (
				<li key={item.id} data-id={item.id} className={`layoutBlock ${styles.draggable}`}>
					{
						item.element({ ...item, id: item.id, panelInfo: { panelName: E_PanelNames.secondary } })
					}
				</li>
			))}
		</ReactSortable>
	</div>
);

export default SecondaryPanel;