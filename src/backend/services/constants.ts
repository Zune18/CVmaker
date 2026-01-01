export enum apiVersions {
	apiV1 = '/api/v1',
	apiv2 = '/api/v2',
}

export enum apiEndPoints {

	// user routes
	login = '/auth/user/login',
	get_me = '/auth/user/me',
	signOut =  '/auth/user/logout',
	display = '/document/get-my-documents',

    // document routes
    get_document_details = '/document/get-document',
	get_document_config = '/doc-config/get-doc-config',
	update_document_config = '/doc-config/modify-doc-config',

	// page config
	get_document_pages = '/page-config/get-page-config',
	get_document_data = '/page-config/get-page-config-with-data',
	update_page_config = '/page-config/modify-page-config',
	delete_page_config = '/page-config/delete-page-config',
	insert_page_config = '/page-config/insert-page-config',

	// personal information
	update_personal_information = '/personal-info/modify-personal-info',

	// skills
	sync_skills = '/skills/sync-multiple-skills',
	sync_interests = '/interests/sync-multiple-interests',

	// work_exps
	sync_work_exps = '/work-exp/sync-work-exps',

	// projects
	sync_projects = '/projects/sync-multiple-projects',
	// educations
	sync_educations = '/education/sync-multiple-education',
	// achievements
	sync_achievements = '/achievements/sync-multiple-achievements',

	// templates
	get_templates = '/template/get-template',
	get_manage_template = '/template/get-manage-template',
	modify_template_visibility = '/template/modify-template-visibility',

	// test
	test_api = '/test',

	dummy_api = 'https://jsonplaceholder.typicode.com/todos/1'
};