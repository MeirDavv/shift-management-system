import { jsx as _jsx } from "react/jsx-runtime";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const RunAIScriptButton = () => {
    const runAIScript = async () => {
        try {
            const response = await axios.post(`${API_URL}/run-ai-script`, {}, {
                withCredentials: true, // Ensure cookies (containing JWT) are sent with the request
            });
            console.log(response.data.message);
        }
        catch (error) {
            console.error('Error running the script:', error.response ? error.response.data : error.message);
        }
    };
    return (_jsx("button", { onClick: runAIScript, children: "Run AI calculation" }));
};
export default RunAIScriptButton;
