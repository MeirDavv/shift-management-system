import React from "react";
import apiClient from "../apiClient";

interface RunAIScriptButtonProps {
    onComplete: () => void; // Accept a callback function as a prop
}
const RunAIScriptButton: React.FC<RunAIScriptButtonProps> = ({onComplete}) => {
    const runAIScript = async () => {
        try{
            const endpoint = '/api/run-ai-script'
            const response = await apiClient.post(endpoint,{});
            onComplete(); //Trigger the callback after the script runs successfully
            console.log(response.data.message);
        } catch (error: any) {
            console.error('Error running the script:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <button onClick={runAIScript}>Run AI calculation</button>
    );
};

export default RunAIScriptButton;