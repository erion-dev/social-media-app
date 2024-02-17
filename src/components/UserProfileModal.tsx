import React from "react";
import { Button, Modal, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthenticationContext/useAuth";

const UserProfileModal: React.FC<{
	open: boolean;
	setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
	const { user } = useAuth();

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="user-profile-modal"
			aria-describedby="user-profile-details"
		>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 400,
					bgcolor: "background.paper",
					boxShadow: 24,
					borderRadius: "2xl",
					p: 4,
				}}
			>
				<Typography
					id="user-profile-modal"
					variant="h6"
					component="h2"
					gutterBottom
					fontWeight="bold"
				>
					User Profile
				</Typography>
				<Typography id="user-profile-details" variant="body1" gutterBottom>
					Email: {user?.email}
				</Typography>
				<Button sx={{ mt: 10 }} onClick={handleClose}>
					Close
				</Button>
			</Box>
		</Modal>
	);
};

export default UserProfileModal;
