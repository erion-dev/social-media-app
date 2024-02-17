import React, { createContext, useState, PropsWithChildren } from "react";

// Define types for user credentials
interface User {
	email: string;
	password: string;
}

// Define context type
interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => void;
	logout: () => void;
}

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

// AuthProvider component
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<User | null>(() => {
		// Retrieve user from local storage on initial render
		const storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : null;
	});

	const login = (email: string, password: string) => {
		// Simulate authentication and store user in state and local storage
		const newUser: User = { email, password };
		setUser(newUser);
		localStorage.setItem("user", JSON.stringify(newUser));
	};

	const logout = () => {
		// Clear user from state and local storage
		setUser(null);
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
