// src/pages/EditLayoutPage.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { useFormBuilder } from '../../context/FormBuilderContext';

export default function EditLayoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateForm } = useFormBuilder();

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    const stored = JSON.parse(localStorage.getItem('published-forms') || '{}');
    const tpl = stored[id];
    if (!tpl) {
      navigate('/forms');
      return;
    }
    updateForm(tpl.config ?? tpl);
    // Redirect to builder root which renders BuilderPage
    navigate('/', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box p={3}>
      <Typography>Loading layout for edit...</Typography>
    </Box>
  );
}
