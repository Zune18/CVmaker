import WorkExperience from '../../sections/work-experience/work-experience';
import Education from '../../sections/education/education';
import React from 'react';
import Skills from '../../sections/skills/skills';
import Interests from '../../sections/interests/interests';
import Projects from '../../sections/projects/projects'
import Achievements from '../../sections/achievements/achievements';

export enum ESectionsNames {
	work = 'work',
	education = 'education',
    skills = 'skills',
	interests = 'interests',
	projects = 'projects',
	achievements = 'achievements',
}

export enum ESectionTypes {
	software = 'software',
	business = 'business',
}

export const SectionTypeMapping: Record<ESectionsNames, ESectionTypes[]> = {
	[ESectionsNames.work]: [ESectionTypes.software],
	[ESectionsNames.education]: [ESectionTypes.software],
	[ESectionsNames.skills]: [ESectionTypes.software],
	[ESectionsNames.interests]: [ESectionTypes.software],
	[ESectionsNames.projects]: [ESectionTypes.software],
	[ESectionsNames.achievements]: [ESectionTypes.software]
};

export interface ISectionDetail {
    id: string;
	element: (props: any) => React.ReactNode;
	config?: IGetSectionDetailsParams;
}

const SectionDetails: Record<ESectionsNames, Record<string, ISectionDetail>> = {
	[ESectionsNames.work]: {
		[ESectionTypes.software]: {
			id: 'work_software',
			element: (props) => <WorkExperience {...props} />
		}
	},
	[ESectionsNames.education]: {
		[ESectionTypes.software]: {
			id: 'education_software',
			element: (props) => <Education {...props} />
		}
	},
	[ESectionsNames.skills]: {
		[ESectionTypes.software]: {
			id: 'skills_software',
			element: (props) => <Skills {...props} />
		}
	},
	[ESectionsNames.interests]: {
		[ESectionTypes.software]: {
			id: 'interests_software',
			element: (props) => <Interests {...props} />
		}
	},
	[ESectionsNames.projects]: {
		[ESectionTypes.software]: {
			id: 'projects_software',
			element: (props) => <Projects {...props} />
		}
	},
	[ESectionsNames.achievements]: {
		[ESectionTypes.software]: {
			id: 'achievements_software',
			element: (props) => <Achievements {...props} />
		}
	}
};

export interface IGetSectionDetailsParams {
    section: ESectionsNames,
    sectionType: ESectionTypes,
    customLabel: string;
    defaultLabel: string;
    iconUrl: any;
}

export function getSectionDetails(data: IGetSectionDetailsParams): ISectionDetail {
	if (!data.defaultLabel) {
		data.defaultLabel = data.section
	}
	if (!data.customLabel) {
		data.customLabel = ''
	}
	return { ...SectionDetails[data.section][data.sectionType], config: data };
}

export const getSectionWiseDetails = (rawList: any[] = []): ISectionDetail[] => {
	const data = rawList.map((item: any) => {
		const d = getSectionDetails({ ...item });
		return d;
	});
	return [...data]
};
