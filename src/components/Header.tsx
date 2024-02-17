import { AccountCircle } from "@mui/icons-material";
import {
	AppBar,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthenticationContext/useAuth";
import UserProfileModal from "./UserProfileModal";

export const Header = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [openedModal, setOpenModal] = React.useState(false);
	const open = Boolean(anchorEl);
	const { logout } = useAuth();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const openModal = () => {
		setOpenModal(true);
		handleClose();
	};

	const handleLogout = () => {
		logout();
		handleClose();
	};
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Social Media
				</Typography>

				<div>
					<IconButton
						id="basic-button"
						aria-controls={open ? "basic-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
					>
						<MenuItem onClick={openModal}>My account</MenuItem>
						<MenuItem onClick={handleLogout}>Logout</MenuItem>
					</Menu>
					<UserProfileModal open={openedModal} setOpen={setOpenModal} />
				</div>
			</Toolbar>
		</AppBar>
	);
};
