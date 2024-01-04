import React, { useState } from 'react';
import apiService from '../services/apiService';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ResumeQuestionsTests = () => {
    const [resume, setResume] = useState(null);
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const uploadResponse = await apiService.post('resumes/upload/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(uploadResponse.data);
                setResume(uploadResponse.data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleQuerySubmit = async () => {
        if (resume && query) {
            try {
                const qaResponse = await apiService.post('resumes/qa/', {
                    resume_id: resume.id,
                    query: query,
                });
                console.log(qaResponse.data);
                setResponse(qaResponse.data.response);
            } catch (error) {
                console.error('Error submitting query:', error);
            }
        }
    };

    return (
        <Box>
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
            />
            <TextField
                label="Ask a question"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleQuerySubmit}
                disabled={!resume}
            >
                Submit Query
            </Button>
            {response && <p>{JSON.stringify(response)}</p>}
        </Box>
    );
};

export default ResumeQuestionsTests;