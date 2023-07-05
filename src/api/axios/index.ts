import axios from "axios";

const BASE_URL = "http://176.58.105.140:8080/api/v1";

export default axios.create({
	baseURL: BASE_URL,
});
