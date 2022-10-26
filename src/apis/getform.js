import axios from "axios";

const baseURL = "https://getform.io";

export default axios.create({
    baseURL,
    headers: {
        Accept: "application/json"
    }
});
