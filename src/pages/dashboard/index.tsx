import React, { useState, useEffect } from 'react';	
import BasePage from '../../frontend/components/Global/BasePage/base-page';
import {
	mydocumentsPath
} from '../../frontend/components/Global/global-paths/global-paths';
import styles from './index.module.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import cv1 from '../../images/1.jpg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import cv2 from "../../images/2.jpg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import cv3 from "../../images/3.jpg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import videoFile from '../../../src/videos/1.mp4';
import { NavLink } from 'react-router-dom';
function Dashboard() {
	// const images = [cv1, cv3, cv2, cv1, cv3, cv2];
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};}, []);
	const images = [cv1, cv3, cv2, cv1, cv3, cv2];
	const handleImageStyle = (image: any, index:number) => {
		const blurAmount = scrollY / 100;
		return {
			backgroundImage: `url(${image})`,
			filter: `blur(${blurAmount}px)`,
			transition: 'filter 0.3s ease-in-out'
		};
	};
	return (
		<BasePage>
			<div className={styles.headerLinkContainer}>
				<div className={styles.container}>
					<div id="slide" className={styles.slide}>
						{images.map((image, index) => (
							<div
								key={index}
								className={styles.item}
								style={handleImageStyle(image, index)}
							>
								<div className={styles.content}>
									<div className={styles.name}>Your Career. Your CV.</div>
									<div className={styles.des}>
                                      Create a professional resume that highlights your skills and experience.
									</div>
									<div className={styles.des}>
										Designed to impress recruiters and get you hired faster.
									</div>
									<NavLink to={mydocumentsPath}>
										<button className={styles.findMoreResume}>
											SEE MORE
										</button>
									</NavLink>

								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* team  */}

			{/* <div className={styles.category}>
				<video autoPlay muted loop className={styles.videoComponent} controls={false}>
					<source src={videoFile} type="video/mp4" />
				</video>
			</div> */}

			{/* ends */}

			{/* resume templates  */}

			<div className={styles.resumetemplate}>
				<div className={styles.insidetemplate}>
					<div>
						<h1>Resume Templates for Every Career Path.</h1>
					</div>
					<div className={styles.headText}>
                        You can pick one of our handcrafted resume templates
                        above. You can start building your resume in less than 5
                        seconds, using predefined sections approved by
                        recruiters worldwide. You can also customize it to your
                        own needs and personality and hit 'Download'. It's THAT
                        easy to use, even if you've never made a resume in your
                        life before!
					</div>
					<div className={styles.templatecontant}>
						<div className={styles.cv}>
							<div className={styles.cvfirstphoto}> </div>
							<div className={styles.cv}>
								<h4>Creative Resume Template</h4>
								<p>
                                    A resume template as creative as your
                                    imagination
								</p>
							</div>
						</div>
						<div className={styles.cv}>
							<div className={styles.cvsecondphoto}> </div>
							<div className={styles.cv}>
								<h4>Creative Resume Template</h4>
								<p>
                                    A resume template as creative as your
                                    imagination
								</p>
							</div>
						</div>
						<div className={styles.cv}>
							<div className={styles.cvthirdphoto}> </div>
							<div className={styles.cvtext}>
								<h4>Creative Resume Template</h4>
								<p>
                                    A resume template as creative as your
                                    imagination
								</p>
							</div>
						</div>
					</div>
					<button
						className={styles.findMoreResume}
						onClick={() => {
							window.alert('🚧 We will add resumes soon!');
						}}
					>
						Find more resume templates
					</button>

				</div>
			</div>

			{/* ends  */}

			{/* steps to use  */}

			<div className={styles.stepBlock}>
				<div>
					{' '}
					<h2>Build Your Resume Fast and Easy.</h2>{' '}
				</div>
				<div className={styles.paragraph}>
					{' '}
					<p>
                        CV Maker is lightning fast. There's no software to
                        download. No multi-part sign-up form. No long-winded
                        tutorials. Just a straightforward process.
					</p>{' '}
				</div>
				<div className={styles.firststep}>
					<div className={styles.firstLeftStep}>
						<div className={styles.firstLeftTop}> 1 </div>
						<div className={styles.firstLeftbottom}>
							{' '}
							<h2>1. Pick a Template</h2>
							<p>
                                Don't sabotage your job search before it has
                                even begun. Choose from our ATS-friendly,
                                hand-crafted resume templates
							</p>{' '}
						</div>
					</div>
					{/* <div className={styles.firstRightStep}> </div> */}
				</div>

				<div className={styles.secondstep}>
					{/* <div className={styles.secondRightStep}> </div> */}
					<div className={styles.secondLeftStep}>
						<div className={styles.secondLeftTop}> 2 </div>
						<div className={styles.secondLeftbottom}>
							{' '}
							<h2>2. Customize Your Layout</h2>
							<p>
                                Make the resume template truly your own.
                                Customize the layout based on your experience
                                level.
							</p>{' '}
						</div>
					</div>
				</div>

				<div className={styles.thirdstep}>
					<div className={styles.thirdLeftStep}>
						<div className={styles.thirdLeftTop}> 3 </div>
						<div className={styles.thirdLeftbottom}>
							{' '}
							<h2>3. Fill in the Blanks</h2>
							<p>
                                Fill in your resume information, let our AI
                                content analyzer do its job, and see your resume
                                changes dynamically in real time
							</p>{' '}
						</div>
					</div>
					{/* <div className={styles.thirdRightStep}> </div> */}
				</div>

				<div className={styles.fourthstep}>
					{/* <div className={styles.fourthRightStep}> </div> */}
					<div className={styles.fourthLeftStep}>
						<div className={styles.fourthLeftTop}> 4 </div>
						<div className={styles.fourthLeftbottom}>
							{' '}
							<h2>4. Hit 'Download!'</h2>
							<p>
                                And yes, it's free! We don't hit you with a
                                paywall once you've completed your resume in the
                                Basic Account. If you use any of our premium
                                features, the software will let you know about
                                it.
							</p>{' '}
						</div>
					</div>
				</div>
			</div>

			{/* ends  */}

			<div className={styles.scene}> </div>

			{/* footer  */}

			<div className={styles.socialMedia}>
				<button className={styles.facebook}> </button>
				<button className={styles.linkdin}> </button>
				<button className={styles.twiter}> </button>
				<button className={styles.instagram}> </button>
			</div>

			<div className={styles.footercontainer}>
				<div className={styles.insidecontainer}>
					<div className={styles.aboutus}>
						<h2>About us</h2>
						<p>
							We help job seekers create professional, recruiter-friendly resumes
							with ease. Our CV builder offers modern templates and a simple
							process to highlight skills, experience, and career goals
							effectively.
						</p>
					</div>
					<div className={styles.newsletter}>
						<h2>Email</h2>
						<p>Stay update with our latest</p>
						<div className={styles.formelement}>
                            abcd.resume@gmail.
						</div>
						<div className={styles.formelement}>
                            testnew@gmail.com
						</div>
					</div>
					<div className={styles.instagram}>
						<h2>Website Photos</h2>
					</div>
					<div className={styles.follow}>
						<h2>Contact us</h2>
						<p>Let us be Social</p>
					</div>
				</div>
				<div className={styles.copyrighttext}>
					<h4>Copyright ©2023 cvmaker.in | All rights reserved</h4>
				</div>
			</div>
		</BasePage>
	);
}

export default Dashboard;
