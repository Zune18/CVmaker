// eslint-ignore
import React from 'react';
import { Text, View, StyleSheet, Link, Image } from '@react-pdf/renderer';
import { defaultStyles, ImageStyle, TextStyle } from '../../default-stylesheet';
import { I_DocSettings } from '../../../../../../backend/services/resume/doc-config.interface';
import { PdfIcons } from '../../pdf-icons';
import { PdfUtils } from '../../helpers/utils';

interface I_Section {
    settings: I_DocSettings;
    data: any;
}

const AboutMePdf = ({ settings, data }: I_Section) => (
	<View style={styles.container}>
		<View style={{ ...defaultStyles.flexRow, padding: '8px 16px' }}>
			<View style={styles.aboutMe}>
				<Text
					style={{
						...styles.name,
						fontSize: PdfUtils.getFontSize(1.8, settings.fontSize)
					}}
				>
					{data?.name}
				</Text>
				<Text style={{...styles.designation, fontSize: PdfUtils.getFontSize(1.1, settings.fontSize) }}>{data?.designation}</Text>
				<Text style={{...styles.description, fontSize: PdfUtils.getFontSize(1.1, settings.fontSize) }}>{data?.address}</Text>
				<Text style={{ ...styles.description, marginTop: 4, fontSize: PdfUtils.getFontSize(1.1, settings.fontSize) }}>
					{data?.bio}
				</Text>
			</View>
			{settings.showPhoto ? (
				<Image
					src={'https://images.pexels.com/photos/4420634/pexels-photo-4420634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
					style={ImageStyle.default}
				/>
			) : null}
		</View>
		{data ? (
			<View
				style={{
					...styles.socialMediaDetails,
					backgroundColor: settings.bgColor
				}}
			>
				{data.email && (
					<View style={styles.socialLinks}>
						<Image
							src={PdfIcons.email}
							style={styles.socialIcons}
						/>
						<Text style={styles.socialTitle}>{data.email}</Text>
					</View>
				)}
				{data.phone && (
					<View style={styles.socialLinks}>
						<Image
							src={PdfIcons.phone}
							style={styles.socialIcons}
						/>
						<Text style={styles.socialTitle}>{data.phone}</Text>
					</View>
				)}
				{data.facebook && (
					<View style={styles.socialLinks}>
						<Image
							src={PdfIcons.facebook}
							style={styles.socialIcons}
						/>
						<Text style={styles.socialTitle}>{data.facebook}</Text>
					</View>
				)}
				{data.linkedin && (
					<View style={styles.socialLinks}>
						<Image
							src={PdfIcons.linkedin}
							style={styles.socialIcons}
						/>
						<Text style={styles.socialTitle}>{data.linkedin}</Text>
					</View>
				)}
				{data.twitter && (
					<View style={styles.socialLinks}>
						<Image
							src={PdfIcons.twitter}
							style={styles.socialIcons}
						/>
						<Text style={styles.socialTitle}>{data.twitter}</Text>
					</View>
				)}
				{data.instagram && (
					<View style={styles.socialLinks}>
						<Image
							src={PdfIcons.instagram}
							style={styles.socialIcons}
						/>
						<Text style={styles.socialTitle}>{data.instagram}</Text>
					</View>
				)}
			</View>
		) : null}
	</View>
);

const styles = StyleSheet.create({
	container: {
		...defaultStyles.flexCol,
		flexGrow: 1
	},
	aboutMe: {
		...defaultStyles.flexCol,
		flexGrow: 1
	},
	designation: {
		...TextStyle.default,
		fontStyle: 'italic',
		fontWeight: 300
	},
	name: {
		...TextStyle.default,
		fontWeight: 500
	},
	description: {
		...TextStyle.sm,
		fontWeight: 300
	},
	socialMediaDetails: {
		...defaultStyles.flexRow,
		flexWrap: 'wrap',
		padding: '5px 0px',
		flexGrow: 1,
		color: '#FFF',
		fontWeight: 500
	},
	socialTitle: {
		...TextStyle.sm,
		fontSize: 8
	},
	socialIcons: {
		display: 'flex',
		width: 16,
		height: 16,
		padding: 2,
		marginRight: 5,
		borderRadius: 3,
		// backgroundColor: 'teal',
		justifyContent: 'center',
		alignItems: 'center'
	},
	socialLinks: {
		...defaultStyles.flexRowCenter,
		minWidth: '40%',
		marginLeft: '10%',
		padding: '4px 0'
		// border: '2px solid red'
	}
});

export default AboutMePdf;
