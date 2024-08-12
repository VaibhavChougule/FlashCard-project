import axios from "axios";
import config from "../config";
async function showlist(setQuestions) {
    console.log("called");

    const data = await axios.get(`${config.API_URL}/questionList`)
    console.log(data);
    setQuestions(data.data);
}

export default showlist;