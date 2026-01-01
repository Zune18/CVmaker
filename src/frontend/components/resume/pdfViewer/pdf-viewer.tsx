import { Document, Font } from '@react-pdf/renderer';
import PagePdf from './page-pdf';
import React, { useEffect } from 'react';
import { getPdfSectionWiseDetails } from './pdf-config-constant';

// fonts
import Thin from './Poppins/Poppins-Thin.ttf';
import Thin_Italic from './Poppins/Poppins-ThinItalic.ttf';
import Extra_light from './Poppins/Poppins-ExtraLight.ttf';
import Extra_light_Italic from './Poppins/Poppins-ExtraLightItalic.ttf';
import Light from './Poppins/Poppins-Light.ttf';
import Light_Italic from './Poppins/Poppins-LightItalic.ttf';
import Regular from './Poppins/Poppins-Regular.ttf';
import Regular_Italic from './Poppins/Poppins-Italic.ttf';
import Medium from './Poppins/Poppins-Medium.ttf';
import Medium_Italic from './Poppins/Poppins-MediumItalic.ttf';
import SemiBold from './Poppins/Poppins-SemiBold.ttf';
import SemiBold_Italic from './Poppins/Poppins-SemiBoldItalic.ttf';
import Bold from './Poppins/Poppins-Bold.ttf';
import Bold_Italic from './Poppins/Poppins-BoldItalic.ttf';
import ExtraBold from './Poppins/Poppins-ExtraBold.ttf';
import ExtraBold_Italic from './Poppins/Poppins-ExtraBoldItalic.ttf';
import Black from './Poppins/Poppins-Black.ttf';
import Black_Italic from './Poppins/Poppins-BlackItalic.ttf';

Font.register({
	family: 'Poppins', fonts: [
		{ src: Thin, fontWeight: 'thin', fontStyle: 'normal' },
		{ src: Thin_Italic, fontWeight: 'thin', fontStyle: 'italic' },
		{ src: Extra_light, fontWeight: 'ultralight', fontStyle: 'normal' },
		{ src: Extra_light_Italic, fontWeight: 'ultralight', fontStyle: 'italic' },
		{ src: Light, fontWeight: 'light', fontStyle: 'normal' },
		{ src: Light_Italic, fontWeight: 'light', fontStyle: 'italic' },
		{ src: Regular, fontWeight: 'normal', fontStyle: 'normal' },
		{ src: Regular_Italic, fontWeight: 'normal', fontStyle: 'italic' },
		{ src: Medium, fontWeight: 'medium', fontStyle: 'normal' },
		{ src: Medium_Italic, fontWeight: 'medium', fontStyle: 'italic' },
		{ src: SemiBold, fontWeight: 'semibold', fontStyle: 'normal' },
		{ src: SemiBold_Italic, fontWeight: 'semibold', fontStyle: 'italic' },
		{ src: Bold, fontWeight: 'bold', fontStyle: 'normal' },
		{ src: Bold_Italic, fontWeight: 'bold', fontStyle: 'italic' },
		{ src: ExtraBold, fontWeight: 'ultrabold', fontStyle: 'normal' },
		{ src: ExtraBold_Italic, fontWeight: 'ultrabold', fontStyle: 'italic' },
		{ src: Black, fontWeight: 'heavy', fontStyle: 'normal' },
		{ src: Black_Italic, fontWeight: 'heavy', fontStyle: 'italic' }
	]
});

interface I_PdfViewer {
	config: any;
	settings: any;
	intro: any;
	docInfo: any;
	docData?: any;
}

const PdfViewer = ({ config, settings, docInfo, intro, docData }: I_PdfViewer): any => (
	<Document>
		{Object.keys(config)?.map((item: any, index: number) => <PagePdf
			intro={intro ?? {}}
			secondaryList={getPdfSectionWiseDetails(config[item].secondaryPanel)}
			mainList={getPdfSectionWiseDetails(config[item].mainPanel)} key={index} index={index}
			config={config[item]}
			settings={settings}
			pageData={docData[item]}
		/>
		)}
	</Document>
);

export default PdfViewer;