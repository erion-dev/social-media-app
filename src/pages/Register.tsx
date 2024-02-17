import React, { useState, ChangeEvent, FormEvent } from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	Box,
	Link,
	Stack,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const navigate = useNavigate();

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		navigate("/login");
	};

	return (
		<Stack height="100%" direction="column" justifyContent="center">
			<Container component="main" maxWidth="xs">
				<Typography component="h1" variant="h5">
					Register
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
						autoComplete="new-password"
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
						Register
					</Button>
					<Box textAlign="center">
						<Typography variant="body2">
							Already have an account?{" "}
							<Link component={RouterLink} to="/login" variant="body2">
								Sign in
							</Link>
						</Typography>
					</Box>
				</Box>
			</Container>
		</Stack>
	);
};

export default Register;
