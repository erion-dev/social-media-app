import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { useAuth } from "./context/AuthenticationContext/useAuth";

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth();
	if (!user) {
		return <Navigate to="/login" />;
	}
	return children;
};
