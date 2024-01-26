import React, { useState } from 'react';
import apiService from '../services/apiService';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ResumeQuestionsTests = () => {
    const [resume, setResume] = useState(null);
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [query2, setQuery2] = useState('');
    const [response2, setResponse2] = useState('');

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


    const handleQuerySubmit2 = async () => {
        if (resume && query2) {
            try {
                const qaResponse = await apiService.post('resumes/qa2/', {
                    resume_id: resume.id,
                    queries: JSON.parse(query2)
                });
                console.log(qaResponse.data);
                setResponse2(qaResponse.data.responses);
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
                label="Enter html form"
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
            <br></br>
            <br></br>
            <br></br>
            <TextField
                label="Enter field name"
                value={query2}
                onChange={(e) => setQuery2(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleQuerySubmit2}
                disabled={!resume}
            >
                Submit Query
            </Button>
            {response2 && <p>{JSON.stringify(response2)}</p>}
        </Box>
    );
};

export default ResumeQuestionsTests;