import * as React from 'react';
import styles from './base-page.module.css';

interface IBasePage {
	children: React.ReactNode;
}

function BasePage({ children }: IBasePage) {
	return (
		<div className={styles.container}>
			{children}
		</div>
	);
}

export default BasePage;