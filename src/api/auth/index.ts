import axios from "../axios";

export const loginUser = async (data: any) => {
	try {
		const response = await axios.post("/auth/authenticate", JSON.stringify(data), {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (err) {
		console.log(err);
		return err;
	}
};


export const registerUser = async (data: any) => {
	try {
		const response = await axios.post("/users/signup", JSON.stringify(data), {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (err) {
		console.log(err);
		return err;
	}
};



export const requestPasswordReset = async (data: any) => {
	try {
		const response = await axios.post(
			"/user/forget-password",
			JSON.stringify(data),
			{
				headers: { "Content-Type": "application/json", accept: "*/*" },
			}
		);
		return response;
	} catch (error) {
		// toast.error("Somthing went wrong / Mail not sent");
		return error;
	}
};

export const resetPassword = async (data: any, token: string) => {
	try {
		const response = await axios.post(
			`/user/reset-password?token=${token}`,
			JSON.stringify(data),
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response;
	} catch (error) {
		// toast.error("Somthing went wrong / Password dose not match");
		return error;
	}
};

export const getUser = async () => {
	const userDetails: any = localStorage.getItem("userToken");
	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.get("/user/current-user", {
			headers: { Authorization: `Bearer ${parsedData}` },
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};
