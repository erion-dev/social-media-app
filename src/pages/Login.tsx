import React, { useState, ChangeEvent, FormEvent } from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	Box,
	Grid,
	Stack,
} from "@mui/material";
import { useAuth } from "../context/AuthenticationContext/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { login } = useAuth();
	const navigate = useNavigate();

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		login(email, password);
		navigate("/");
	};

	return (
		<Stack height="100%" direction="column" justifyContent="center">
			<Container component="main" maxWidth="xs">
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={handleEmailChange}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={handlePasswordChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Grid container justifyContent="center">
						<Grid item>
							<Link to="/register">Don't have an account? Register</Link>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</Stack>
	);
};

export default Login;
