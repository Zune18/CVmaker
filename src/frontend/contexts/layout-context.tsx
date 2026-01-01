import React, { createContext, useContext, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../backend/redux/store';
import { ASetMainPanel, ASetSecondaryPanel } from '../../backend/redux/reducers/document-reducer';
import { getSectionWiseDetails } from '../components/resume/layouts/constants/config-constants';
import { E_PanelNames } from '../../backend/services/resume/doc-config.interface';

export enum ThemeTypes {
	light = 'light',
	dark = 'dark'
}

export class I_LayoutContext {
	pageNo: string = 'page_1';
	pageInfo: any;
	secondaryList: any[] = [];
	setSecondaryList = (data: any) => {
	};

	mainList: any[] = [];
	setMainList = (data: any) => {
	};

	refreshLists = () => {
	};

	deleteSection = (panelInfo: any, config: any) => {
	};

	updateSectionData = (panelInfo: any, config: any, updatedData: any) => {
	};
}

export const LayoutContext = createContext<I_LayoutContext>({ ...new I_LayoutContext() });

export const useLayoutContext = (): I_LayoutContext => useContext(LayoutContext);

interface IThemeContextProvider {
	children: React.ReactNode,
	pageNo: string;
}

export const LayoutContextProvider = ({ children, pageNo }: IThemeContextProvider) => {
	// redux hooks
	const dispatch = useDispatch();
	const config = useSelector((state: RootState) => state.doc_config.config[pageNo]);
	const pageInfo = useSelector((state: RootState) => state.doc_data.pagewise_data[pageNo] ?? {});

	const secondaryList = useMemo(() => {
		if (config.secondaryPanel) {
			return getSectionWiseDetails(config.secondaryPanel)
		}
		return []
	}, [config.secondaryPanel]);

	const mainList = useMemo(() => {
		if (config.mainPanel) {
			return getSectionWiseDetails(config.mainPanel)
		}
		return []
	}, [config.mainPanel]);

	const setRefreshLists = useRef(false);

	const setSecondaryList = (data: any) => {
		const _secondaryPanel = data.map((item: any) => (item.config));
		dispatch(ASetSecondaryPanel({ val: _secondaryPanel, pageNo }));
	};

	const setMainList = (data: any) => {
		const _mainPanel = data.map((item: any) => (item.config));
		dispatch(ASetMainPanel({ val: _mainPanel, pageNo }));
	};

	function refreshLists() {
		setSecondaryList(getSectionWiseDetails(config.secondaryPanel));
		setMainList(getSectionWiseDetails(config.mainPanel));
	}

	function deleteSection(panelInfo: any, config: any) {
		if (panelInfo?.panelName === E_PanelNames.main) {
			const _list = mainList.filter((item: any) => item.config.id !== config.id);
			setMainList([..._list]);
		} else if (panelInfo?.panelName === E_PanelNames.secondary) {
			const _list = secondaryList.filter((item: any) => item.config.id !== config.id);
			setSecondaryList([..._list]);
		}
	}

	function updateSectionData(panelInfo: any, layoutConfig: any, updatedData: any) {
		if (panelInfo?.panelName === E_PanelNames.main) {
			const _list: any[] = [];
			config.mainPanel.map((item: any) => {
				const newData = { ...item };
				if (newData.id === layoutConfig.id) {
					newData.customLabel = updatedData.customLabel;
				}
				_list.push(newData);
				return null;
			});
			setRefreshLists.current = true;
			dispatch(ASetMainPanel({ val: _list, pageNo }));
		} else if (panelInfo?.panelName === E_PanelNames.secondary) {
			const _list: any[] = [];
			config.secondaryPanel.map((item: any) => {
				const newData = { ...item };
				if (newData.id === layoutConfig.id) {
					newData.customLabel = updatedData.customLabel;
				}
				_list.push(newData);
				return null;
			});
			setRefreshLists.current = true;
			dispatch(ASetSecondaryPanel({ val: _list, pageNo }));
		}
	}

	return (
		<LayoutContext.Provider
			value={{
				pageNo,
				pageInfo,
				secondaryList,
				setSecondaryList,
				mainList,
				setMainList,
				refreshLists,
				deleteSection,
				updateSectionData
			}}>
			{children}
		</LayoutContext.Provider>
	);
};