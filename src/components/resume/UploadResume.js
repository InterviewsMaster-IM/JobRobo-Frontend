import React, { useState } from 'react';
import apiService from "../../services/apiService";

// Function to upload a file
const uploadResume = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return apiService.post('resumes/upload/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

//start parsing the resume after uploading
const startParseResumeTask = (resumeId) => {
    return apiService.post('resumes/start-task/', { resume_id: resumeId });
};

// Function to check the status of a resume parsing task
const checkParseResumeTaskStatus = (taskId) => {
    return apiService.get(`resumes/check-task/${taskId}/`);
};


const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            setStatus("Uploading...");
            const uploadResponse = await uploadResume(file);
            console.log(uploadResponse);
            setStatus("Parsing resume...");

            const resumeId = uploadResponse.data.id;
            const startParseResponse = await startParseResumeTask(resumeId);
            console.log(startParseResponse);

            const intervalId = setInterval(async () => {
                const statusResponse = await checkParseResumeTaskStatus(resumeId);
                console.log(statusResponse.data);
                if (statusResponse.data.status === 'SUCCESS') {
                    clearInterval(intervalId);
                    setStatus("Done!!");
                    // Handle success (e.g., notify user, update UI)
                }
            }, 1000);
        } catch (error) {
            // Handle error (e.g., notify user, update UI)
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!file}>Upload Resume</button>
            {status ? <p>Status: {status}</p> : null}
        </div>
    );
};

export default ResumeUpload;