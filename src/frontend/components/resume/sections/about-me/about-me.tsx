import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../backend/redux/store';
import styles from './about-me.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import { ASetPersonalInformation } from '../../../../../backend/redux/reducers/document-data-reducer';
import MuiModal from '../../../Global/mui-modal/mui-modal';

const DEFAULT_DATA = {
	name: 'Name',
	designation: 'Profession',
	address: 'Address',
	email: 'Email',
	phone: 'Phone No',
	links: []
};

function AboutMe() {
	// Redux hooks
	const dispatch = useDispatch();
	const settings = useSelector(
		(state: RootState) => state.doc_config.settings
	);
	const aboutData = useSelector(
		(state: RootState) => state.doc_data.personal_information
	);

	const [modelData, setModelData] = useState<any>({});

	const [open, setOpen] = useState(false);
	const [openSocialMedia, setOpenSocialMedia] = useState(false);

	function handleOpen() {
		setModelData({ ...aboutData });
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
		setOpenSocialMedia(false);
	}

	function handleSubmit() {
		dispatch(ASetPersonalInformation({
			...aboutData,
			...modelData
		}));
		setOpen(false);
	}

	const handleToggleSocialMedia = () => {
		setOpenSocialMedia(!openSocialMedia);
	};

	return (
		<>
			<div className={styles.container} onClick={handleOpen}>
				<div className={styles.aboutDetails}>
					<div className={styles.intro}>
						<header className={styles.name}>
							{aboutData.name ?? DEFAULT_DATA.name}
						</header>
						<header className={styles.profession}>
							{aboutData.designation ?? DEFAULT_DATA.designation}
						</header>
						<div className={styles.address}>
							{aboutData.address ?? DEFAULT_DATA.address}
						</div>
						<header className={styles.bio}>{aboutData.bio}</header>
					</div>
					{settings.showPhoto ? (
						<div className={styles.showPhoto}>
							<div className={styles.resumePhoto}>
								<h2>Photo</h2>
							</div>
						</div>
					) : null}
				</div>
				<div
					className={styles.contactDetails}
					style={{
						background: settings.bgColor,
						color: settings.bgColor ? '#FFF' : '#000'
					}}
				>
					<div className={styles.email}>
						<MailIcon />
						<header>
							<a href={`mailto:${aboutData.email}`}>
								{aboutData.email ?? DEFAULT_DATA.email}
							</a>
						</header>
					</div>
					<div className={styles.phoneNo}>
						<CallIcon />
						<header>{aboutData.phone ?? DEFAULT_DATA.phone}</header>
					</div>

					{aboutData.facebook ? (
						<div className={styles.socialMediaElements}>
							<FacebookIcon />
							<header>
								<a
									href={aboutData.facebook}
									target="_blank"
									rel="noreferrer"
								>
									{aboutData.facebook}
								</a>
							</header>
						</div>
					) : null}
					{aboutData.linkedin ? (
						<div className={styles.socialMediaElements}>
							<LinkedInIcon />
							<header>
								<a
									href={aboutData.linkedin}
									target="_blank"
									rel="noreferrer"
								>
									{aboutData.linkedin}
								</a>
							</header>
						</div>
					) : null}
					{aboutData.twitter ? (
						<div className={styles.socialMediaElements}>
							<TwitterIcon />
							<header>
								<a
									href={aboutData.twitter}
									target="_blank"
									rel="noreferrer"
								>
									{aboutData.twitter}
								</a>
							</header>
						</div>
					) : null}
					{aboutData.instagram ? (
						<div className={styles.socialMediaElements}>
							<InstagramIcon />
							<header>
								<a
									href={aboutData.instagram}
									target="_blank"
									rel="noreferrer"
								>
									{aboutData.instagram}
								</a>
							</header>
						</div>
					) : null}
				</div>
			</div>

			<MuiModal open={open} setOpen={handleClose}>
				<div className={styles.modalContainer}>
					<header className={styles.modalTitle}>
                        Fill up the About details
					</header>
					<div className={styles.submitButton}>
						<Button
							variant="outlined"
							size={'small'}
							className={styles.exitButton}
							onClick={handleClose}
						>
                            Cancel
						</Button>
						<Button
							variant="contained"
							size={'small'}
							onClick={handleSubmit}
						>
                            Save
						</Button>
					</div>
					<div className={styles.modalSecondContainer}>
						{openSocialMedia ? (
							<div className={styles.socialMediaForm}>
								<div className={styles.inputRow}>
									<TextField
										id="facebook"
										className={styles.textfield}
										label="Facebook"
										variant="standard"
										value={modelData.facebook}
										onChange={(event) => {
											modelData.facebook =
                                                event.target.value;
											setModelData({ ...modelData });
										}}
									/>
									<TextField
										id={'linkedin'}
										className={styles.textfield}
										label="Linkedin"
										variant="standard"
										value={modelData.linkedin}
										onChange={(event) => {
											modelData.linkedin =
                                                event.target.value;
											setModelData({ ...modelData });
										}}
									/>
								</div>
								<div className={styles.inputRow}>
									<TextField
										className={styles.textfield}
										label="Twitter"
										variant="standard"
										value={modelData.twitter}
										onChange={(event) => {
											modelData.twitter =
                                                event.target.value;
											setModelData({ ...modelData });
										}}
									/>
									<TextField
										className={styles.textfield}
										label="Instagram"
										variant="standard"
										value={modelData.instagram}
										onChange={(event) => {
											modelData.instagram =
                                                event.target.value;
											setModelData({ ...modelData });
										}}
									/>
								</div>
							</div>
						) : (
							<>
								<div className={styles.inputRow}>
									<TextField
										id={'name'}
										className={styles.textfield}
										label="Name"
										variant="standard"
										value={modelData.name}
										onChange={(event) => {
											modelData.name = event.target.value;
											setModelData({ ...modelData });
										}}
									/>
									<TextField
										id={'designation'}
										className={styles.textfield}
										label="Profession"
										variant="standard"
										value={modelData.designation}
										onChange={(event) => {
											modelData.designation =
                                                event.target.value;
											setModelData({ ...modelData });
										}}
									/>
								</div>
								<div className={styles.inputRow}>
									<TextField
										className={styles.textfield}
										label="Email"
										variant="standard"
										inputMode={'email'}
										value={modelData.email}
										onChange={(event) => {
											modelData.email =
                                                event.target.value;
											setModelData({ ...modelData });
										}}
									/>
									<TextField
										className={styles.textfield}
										label="Phone No"
										variant="standard"
										value={modelData.phone}
										inputProps={{
											inputMode: 'numeric',
											pattern: '[0-9]*'
										}}
										onChange={(event) => {
											modelData.phone =
                                                event.target.value;
											setModelData({ ...modelData });
										}}
									/>
								</div>
								<TextField
									className={`${styles.textfield} ${styles.address}`}
									label="Address"
									multiline
									rows={2}
									variant="standard"
									value={modelData.address}
									onChange={(event) => {
										modelData.address = event.target.value;
										setModelData({ ...modelData });
									}}
								/>
								<TextField
									className={`${styles.textfield} ${styles.address}`}
									label="Introduction"
									multiline
									minRows={2}
									maxRows={6}
									fullWidth={true}
									variant="standard"
									value={modelData.bio}
									onChange={(event) => {
										modelData.bio = event.target.value;
										setModelData({ ...modelData });
									}}
								/>
							</>
						)}
					</div>
					<div className={styles.switchButton}>
						<Button onClick={handleToggleSocialMedia}>
							{openSocialMedia
								? 'Switch to Personal Details'
								: 'Switch to Social Media Details'}
						</Button>
					</div>
				</div>
			</MuiModal>
		</>
	);
}

export default AboutMe;
