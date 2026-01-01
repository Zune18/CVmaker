import WorkExperience from './sections/work-experience/work-experience-pdf';
import Education from './sections/education/education-pdf';
import React from 'react';
import Skills from './sections/skills/skills-pdf';
import InterestsPdf from './sections/interests/interests-pdf';
import AchievementsPdf from './sections/achievement/achievements-pdf';
import ProjectsPdf from "./sections/projects/projects-pdf";

export enum EPdfSectionsNames {
    work = 'work',
    education = 'education',
    skills = 'skills',
    interests = 'interests',
	achievements = 'achievements',
	projects = 'projects',
}

export enum EPdfSectionTypes {
    software = 'software',
    business = 'business',
}

export const PdfSectionTypeMapping: Record<
    EPdfSectionsNames,
    EPdfSectionTypes[]
> = {
	[EPdfSectionsNames.work]: [EPdfSectionTypes.software],
	[EPdfSectionsNames.education]: [EPdfSectionTypes.software],
	[EPdfSectionsNames.skills]: [EPdfSectionTypes.software],
	[EPdfSectionsNames.interests]: [EPdfSectionTypes.software],
	[EPdfSectionsNames.achievements]: [EPdfSectionTypes.software],
	[EPdfSectionsNames.projects]: [EPdfSectionTypes.software]
};

export interface IPdfSectionDetail {
    id: string;
    section?: EPdfSectionsNames;
    sectionType?: EPdfSectionTypes;
    element: (props: any) => React.ReactNode;
}

const PdfSectionDetails: Record<
    EPdfSectionsNames,
    Record<string, IPdfSectionDetail>
> = {
	[EPdfSectionsNames.work]: {
		[EPdfSectionTypes.software]: {
			id: 'work_software',
			element: (props) => <WorkExperience {...props} />
		}
	},
	[EPdfSectionsNames.education]: {
		[EPdfSectionTypes.software]: {
			id: 'education_software',
			element: (props) => <Education {...props} />
		}
	},
	[EPdfSectionsNames.skills]: {
		[EPdfSectionTypes.software]: {
			id: 'skills_software',
			element: (props) => <Skills {...props} />
		}
	},
	[EPdfSectionsNames.interests]: {
		[EPdfSectionTypes.software]: {
			id: 'interests_software',
			element: (props) => <InterestsPdf {...props} />
		}
	},
	[EPdfSectionsNames.achievements]: {
		[EPdfSectionTypes.software]: {
			id: 'achievements_software',
			element: (props) => <AchievementsPdf {...props} />
		}
	},
	[EPdfSectionsNames.projects]: {
		[EPdfSectionTypes.software]: {
			id: 'projects_software',
			element: (props) => <ProjectsPdf {...props} />
		}
	}
};

interface IGetPdfSectionDetailsParams {
    section: EPdfSectionsNames;
    sectionType: EPdfSectionTypes;
}

export function getPdfSectionDetails({
	section,
	sectionType
}: IGetPdfSectionDetailsParams): IPdfSectionDetail {
	return {
		...PdfSectionDetails[section][sectionType],
		section,
		sectionType
	};
}

export const getPdfSectionWiseDetails = (
	rawList: any[] = []
): IPdfSectionDetail[] => {
	const data: any = [];

	for (const item of rawList) {
		const tempItem: IGetPdfSectionDetailsParams = item;
		if (
			PdfSectionDetails[tempItem?.section] &&
            PdfSectionDetails[tempItem?.section][tempItem?.sectionType]?.id
		) {
			const d = getPdfSectionDetails({ ...item });
			data.push(d);
		}
	}
	return [...data];
};
