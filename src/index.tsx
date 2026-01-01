import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import './frontend/localization/config';
// import ApiCall from "./components/ApiCall/api-call";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<>
		<App />
	</>
);
