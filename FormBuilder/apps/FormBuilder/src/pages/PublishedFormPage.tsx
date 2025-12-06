import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { defaultConfig, useFormBuilder } from '../context/FormBuilderContext';
import FormPreview from '../Components/Preview/FormPreview';

export default function PublishedFormPage() {
  const { label } = useParams();
  const navigate = useNavigate();
  const { updateForm } = useFormBuilder();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('published-forms') || '{}');

    if (!label || !saved[label]) {
      alert('Form not found!');
      return navigate('/forms');
    }

    // Load full config into builder context
    updateForm(saved[label]);
  }, [label]);

    
      const goBackToLibrary = () => {
        navigate('/forms');
      };

      const startNewForm = () => {
        updateForm(defaultConfig);
        navigate('/');
      };
    
  return (
      <Box p={3}>
          
      {/* <Typography variant="h4" mb={2}>
        {label}
      </Typography> */}

      <FormPreview showSave={false} />

      <Box mt={3}>
        <Button variant="outlined" onClick={() => navigate(`/?edit=${label}`)}>
          Edit Form Layout
        </Button>
        <Button variant="outlined" onClick={goBackToLibrary} sx={{ ml: 2 }}>
          Back to Library
        </Button>
        <Button variant="contained" color="primary" onClick={startNewForm} sx={{ ml: 2 }}>
          Start New Form
        </Button>
      </Box>
    </Box>
  );
}
