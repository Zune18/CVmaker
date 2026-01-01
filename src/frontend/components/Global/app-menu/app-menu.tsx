import react, * as React from 'react';
import { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import { PopoverOrigin } from '@mui/material';

interface IAppMenu {
	renderCondition?: boolean;
	anchorId: string;
	children: react.ReactNode;
	transformOrigin?: PopoverOrigin;
	anchorOrigin?: PopoverOrigin;
	noAnchor?: boolean;
	containerStyles?: any;
}

function AppMenu({
					 anchorId,
					 children,
					 renderCondition,
					 transformOrigin,
					 anchorOrigin,
					 noAnchor,
					 containerStyles
				 }: IAppMenu) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (anchorId || renderCondition) {
			document.getElementById(anchorId)?.addEventListener('click', handleClick);
		}
		return () => {
			document.getElementById(anchorId)?.removeEventListener('click', handleClick);
		};
	}, [anchorId, renderCondition]);

	useEffect(() => {
		setOpen(!(anchorEl == null));
	}, [anchorEl]);
	const handleClick = (event: any) => {
		setAnchorEl(event.target);
	};
	const handleClose = () => {
		setAnchorEl(null);
		setOpen(false);
	};
	return (
		<>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						...containerStyles,
						'&:before': noAnchor ? {} : {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: -5,
							left: '90%',
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'rotate(45deg)',
							zIndex: 0
						}
					}
				}}
				transformOrigin={transformOrigin ?? { horizontal: 'right', vertical: 'top' }}
				anchorOrigin={anchorOrigin ?? { horizontal: 'right', vertical: 'bottom' }}
			>
				{children}
			</Menu>
		</>
	);
}

export default AppMenu;