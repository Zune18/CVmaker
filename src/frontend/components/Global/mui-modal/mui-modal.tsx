import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'fit-content',
	bgcolor: 'background.paper',
	borderRadius: '4px',
	boxShadow: 24,
	outline: 'none',
	p: 2
};

interface IProps {
	open: boolean
	setOpen: (value: boolean) => void;
	className?: string;
	children: React.ReactNode
}

export default function MuiModal({open, setOpen, className, children} : IProps) {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={className}>
					{children}
				</Box>
			</Modal>
		</>
	);
}