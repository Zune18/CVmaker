import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './loader.module.scss';
import React from 'react';

interface IFullLoader {
    isOpen: boolean
}

function FullLoader({isOpen}: IFullLoader) {
	return (
		<Backdrop
			className={styles.container}
			open={isOpen}>
			<CircularProgress color='inherit' />
		</Backdrop>
	);
};

export default FullLoader;