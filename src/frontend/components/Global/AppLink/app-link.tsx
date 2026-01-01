import React from 'react';
import styles from './app-link.module.scss';
import { NavLink } from 'react-router-dom';

interface IAppLinkProps {
	to: string;
	className?: string;
	children: React.ReactNode;
}

function AppLink(props: IAppLinkProps) {
	const { to } = props;
	return (
		<NavLink  {...props} className={`${styles.link} ${props.className}`}>
			{props.children}
		</NavLink>
	);
}

export default AppLink;