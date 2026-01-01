import React from 'react';

export enum ELayoutTypes {
}

export interface IResumePayoutParams {
    config: any;
}

export interface ILayoutDetails {
    element: (data: IResumePayoutParams) => React.ReactNode;
}

const LayoutDetails: Record<ELayoutTypes, ILayoutDetails> = {
};

export function getLayoutDetails(layoutType: ELayoutTypes): ILayoutDetails {
	return LayoutDetails[layoutType];
}