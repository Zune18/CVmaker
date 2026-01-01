import {combineReducers} from 'redux'
import userReducer from './reducers/user-reducer'
import docReducer from './reducers/document-reducer'
import docDataReducer from './reducers/document-data-reducer'
import editorApiReducer from "./reducers/editor-api-reducer";

const rootReducer = combineReducers({
	user_status: userReducer,
	doc_config: docReducer,
	doc_data: docDataReducer,
	editor_api_status: editorApiReducer
})

export default rootReducer