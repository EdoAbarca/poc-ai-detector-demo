import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState("");
	const [idUser, setIdUser] = useState(null);
	const [userMail, setUserMail] = useState("");
	const [accessToken, setAccessToken] = useState("");
	const [refreshToken, setRefreshToken] = useState("");
	const navigate = useNavigate();

	const loginAction = async (data) => {
		
		setUser(data.user.username);
		setIdUser(data.user.id);
		setUserMail(data.user.email);
		setAccessToken(data.access_token);
		setRefreshToken(data.refresh_token);
	};

	const logOut = () => {
		setUser("");
		setIdUser(null);
		setUserMail("");
		setAccessToken("");
		setRefreshToken("");
		Toastify({
			text: "Sesión finalizada.",
			duration: 3000,
			close: true,
			style: {
				background: "blue",
				text: "white",
			},
		}).showToast();
		navigate("/");
	};

	const refreshTokens = async () => {
		try {
			const response = await fetch("localhost:3333/auth/refresh", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ refreshToken: refreshToken }),
			});

			const res = await response.json();
			setAccessToken(res.accessToken);
			setRefreshToken(res.refreshToken);
			
		} catch (err) {
			console.error(err, "\n Refresh token has expired. Please log in again.");
			return logOut();
		}
	};

	return (
		<AuthContext.Provider value={{ user, idUser, userMail, accessToken, refreshToken, loginAction, refreshTokens, logOut }}>
			{children}
		</AuthContext.Provider>
	);

};

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext);
};
