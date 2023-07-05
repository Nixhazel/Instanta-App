import axios from "../axios";

export const componentsgroup = async () => {
	try {
		const response = await axios.get(
			`/Group/listGroup`,
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

export const incidentHistory = async () => {
	try {
		const response = await axios.get(
			`/Event/events/list?type=Incident&noOfDays=30&printChart=false`,
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
export const graphData = async () => {
	try {
		const response = await axios.get(
			`/Event/events/list?noOfDays=30&printChart=true`,
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
