import axios from "axios";

const baseURL = "https://getform.io";
const url = "/f/fc61ece9-9e62-44b7-8e77-a71d19cb1697";

export default axios.create({
    baseURL: url,
    headers: {
        Accept: "application/json"
    }
});
