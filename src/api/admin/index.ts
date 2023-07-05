import axios from '../axios';


export const getTotalComponentGroup = async () => {
	// const userDetails: any = localStorage.getItem("userToken");
	// const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.get("/Group/countGroup", {
			headers: {

				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (err: any) {
		return err.response;
	}
};

export const Allcomponents = async () => {
	try {
		const response = await axios.get(`/Component/list-component`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		// toast.error("Somthing went wrong / Password dose not match");
		return error;
	}
};

export const createComponentGroup = async (data: any) => {
	const userDetails: any = localStorage.getItem("userToken");
	const parsedData = JSON.parse(userDetails);

	try {
		const response = await axios.post(
			"/Group/create-componentGroup",
			JSON.stringify(data),
			{
				headers: {
					Authorization: `Bearer ${parsedData}`,
					"Content-Type": "application/json",
				},
			}
		);
		return response;
	} catch (err: any) {
		return err.response;
	}
};

export const editComponentGroup = async (id: any, data: any) => {
	const userDetails: any = localStorage.getItem("userToken");

	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.put(
			`/Group/editComponentGroup/${id}`,
			JSON.stringify(data),
			{
				headers: {
					Authorization: `Bearer ${parsedData}`,
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const createComponent = async (data: any) => {
	const userDetails: any = localStorage.getItem("userToken");
	const parsedData = JSON.parse(userDetails);

	try {
		const response = await axios.post(
			"/Component/create-component",
			JSON.stringify(data),
			{
				headers: {
					Authorization: `Bearer ${parsedData}`,
					"Content-Type": "application/json",
				},
			}
		);
		return response;
	} catch (err: any) {
		return err.response;
	}
};

export const editComponent = async (id: any, data: any) => {
	const userDetails: any = localStorage.getItem("userToken");

	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.put(
			`/Component/edit-component/${id}`,
			JSON.stringify(data),
			{
				headers: {
					Authorization: `Bearer ${parsedData}`,
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const createIncident = async (data: any) => {
	// const userDetails: any = localStorage.getItem("userToken");
	// const parsedData = JSON.parse(userDetails);

	try {
		const response = await axios.post(
			"/Event/create-incident",
			JSON.stringify(data),
			{
				headers: {
					// Authorization: `Bearer ${parsedData}`,
					"Content-Type": "application/json",
				},
			}
		);
		return response;
	} catch (err: any) {
		return err.response;
	}
};
